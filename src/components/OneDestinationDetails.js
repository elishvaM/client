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

export default function OneDestinationDetails(lovedAttraction) {
    const chosenAttraction = useSelector(state => state.attraction.selectedAttraction);
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState({});
    const user = useSelector(state => state.user.currentUser);
    React.useEffect(() => {
        getAllCommentsFromServer(chosenAttraction?.id).then(res => {
            setComments(res.data)
        }).catch(err => console.log(err))
    }, [chosenAttraction]);
    const addComment = (desc) => {
        const addC = {
            desc: desc,
            userId: user.id,
            attractionId: chosenAttraction?.id
        }
        console.log('addComent', addC)
        addCommentFromServer(addC).then(res => {
            const newComent = [...comments]
            newComent.push(res.data);
            setComments(newComent)
        }).catch(err => console.log("err add", err))
    }
    return (
        <>
            <h2>{chosenAttraction.name}</h2>
            <h2>{chosenAttraction.desc}</h2>
            <IconButton aria-label="add to favorites" >
                <FavoriteIcon color={chosenAttraction.isLoved ? "error" : "none"} />
            </IconButton>
            <img src={`/imgs/att/${chosenAttraction.img}`} sx={{ width: 50 }} alt={chosenAttraction.name} />
            <h2  href={chosenAttraction.websiteAddres}>{chosenAttraction.websiteAddress}</h2>
            <h2>{chosenAttraction.address.city},{chosenAttraction.address.land}</h2>
            <Link to={chosenAttraction.websiteAddres} />
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
                {/* <form onSubmit={handleSubmit(save)}> */}
                <TextField
                    // {...setComment(value)}
                    // {...register("Desc")}
                    id="outlined-textarea"
                    label="הוספת תגובה"
                    placeholder="כתוב כאן"
                    multiline
                    onChange={(e) => { setComment(e.target.value) }}
                />
                <Button onClick={() => addComment(comment)} >הוסף</Button>
                {/* </form> */}
            </div>

            {comments.length === 0 ? <h3> ...היה הראשון להגיב </h3> :
                comments.map((x, key) => x?.status === true && <OneComment comment={x} />)
            }
        </>
    )
}