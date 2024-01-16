import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Button } from "@mui/base";
import { addCommentFromServer, getAllCommentsFromServer } from "../services/comment";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OneComment from "./OneComment";
import { openingHourFromServer, updateOpeningHourFromServer } from "../services/openingHour";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import Swal from "sweetalert2";
import MoreTimeIcon from '@mui/icons-material/MoreTime';

const TimeInput = ({ openingHour1 }) => {
    const [open, setOpen] = React.useState(openingHour1)
    return <input id="swal-input1" onChange={({ target }) => setOpen(target.value)} value={open} class="swal2-input" />

}
export default function OneDestinationDetails(onLoved) {
    const chosenAttraction = useSelector(state => state.attraction.selectedAttraction);
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState({});
    const arrDays = [{ id: 1, key: "יום ראשון" }, { id: 2, key: "יום שני" }, { id: 3, key: "יום שלישי" }, { id: 4, key: "יום רביעי" }
        , { id: 5, key: "יום חמישי" }, { id: 6, key: "יום שישי" }, { id: 7, key: "יום שבת" }];
    const [openingHours, setOpeningHours] = React.useState([])
    const user = useSelector(state => state.user.currentUser)
    React.useEffect(() => {
        getAllCommentsFromServer(chosenAttraction?.id).then(res => {
            setComments(res.data)
        }).catch(err => console.log(err))
        openingHourFromServer(chosenAttraction?.id).then(res => {
            setOpeningHours(res.data);
        }).catch(err => console.log(err))
    }, [chosenAttraction]);

    //lovedattraction
    const addComment = (desc) => {
        const addC = {
            desc: desc,
            userId: user.id,
            attractionId: chosenAttraction?.id
        }
        addCommentFromServer(addC).then(res => {
            const newComent = [...comments]
            newComent.push({ ...res.data, status: true });
            setComments(newComent)

        }).catch(err => console.log("err add", err))
    }
    const updateHour = (hour) => {
        const copy = [...openingHours];
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: "עידכון שעות פתיחה וסגירה",
                html: `
                <input id="swal-input1" value=${hour?.openingHour1} class="swal2-input">
                <input id="swal-input2" value=${hour?.closingHour} class="swal2-input">
              `,
                confirmButtonText: "עדכן",
                focusConfirm: false,
                preConfirm: () => {
                    if (document.getElementById("swal-input1").value == "") {
                     
                        Swal.showValidationMessage(`הכנס שעות חדשות`)

                    }
                    return [
                        document.getElementById("swal-input1").value,
                        document.getElementById("swal-input2").value

                    ];
                }
            });

            if (formValues[0] !== "" && formValues[1] !== "") {

                Swal.fire({
                    title: "? האם לעדכן את שעות הפתיחה",
                    text: formValues[0] + " " + formValues[1],
                    confirmButtonText: "כן, בדוק",
                    cancelButtonText: "בעצם, לא",
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateOpeningHourFromServer(hour).then(res => {
                            console.log(res)
                            const findIndex = copy.findIndex(x => x.id == hour.id)
                            if (findIndex > -1) {

                                copy[findIndex] = res.data;
                            }
                            else {
                                copy.push(res.data)
                            }
                            setOpeningHours(copy)
                        }).catch(err => console.log(err))
                        Swal.fire({
                            title: "עודכן",
                            text: "שעות הפתיחה עודכנו בהצלחה",
                            icon: "success",
                        });
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire({
                            title: "בוטל",
                            text: "שעות הפתיחה לא עודכנו",
                            icon: "error"
                        });
                    }

                });

                hour.openingHour1 = formValues[0];
                hour.closingHour = formValues[1];

            }
        })()

    }
    return (
        <>
            <h2>{chosenAttraction.name}</h2>
            <h2>{chosenAttraction.desc}</h2>
            {user !== null ?
                <IconButton aria-label="add to favorites" >
                    <FavoriteIcon color={chosenAttraction.isLoved ? "error" : "none"} />
                </IconButton> : null}
            <img src={`/imgs/att/${chosenAttraction.img}`} sx={{ width: 50 }} alt={chosenAttraction.name} />
            <h2 href={chosenAttraction.websiteAddres}>{chosenAttraction.websiteAddress}</h2>
            <h2>{chosenAttraction.address.city},{chosenAttraction.address.land}</h2>
            <Link href={chosenAttraction.websiteAddres}>לאתר</Link>
            <h3>שעות פתיחה</h3>
            {arrDays?.map(x =>
                <div key={x.id}>
                    {x.key}
                    {openingHours.filter(y => y.day == x.id).map(hour => <div>
                        <Tooltip title="ערוך">
                            <IconButton size="medium"
                            >
                                <CreateIcon onClick={() => updateHour(hour)} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="הוסף שעות">
                            <IconButton size="medium"
                            >
                                <MoreTimeIcon onClick={() => updateHour(hour)} />
                            </IconButton>
                        </Tooltip>
                        {hour.openingHour1} - {hour.closingHour} </div>)}
                    <Tooltip title="הוסף שעות">
                        <IconButton size="medium"
                        >
                            <MoreTimeIcon onClick={() => updateHour({ day: x.id, isOpening: true, attractionId: chosenAttraction.id, id: 0 })} />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
            {/* תגובה */}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            />
            <div>
                <TextField
                    id="outlined-textarea"
                    label="הוספת תגובה"
                    placeholder="כתוב כאן"
                    multiline
                    onChange={(e) => { setComment(e.target.value) }}
                />
                <Button onClick={() => addComment(comment)} >הוסף</Button>
            </div>
            {comments.length === 0 ? <h3> ...היה הראשון להגיב </h3> :
                comments.map((x, key) => x?.status === true && <OneComment comment={x} />)
            }
        </>
    )
}