import { Button } from "@mui/base";
import { useEffect } from "react"
import { getComplainedFromServer, deleteFromServer, validFromServer } from "../services/comment";
import { useState } from "react";
import Swal from "sweetalert2";
export default function ManagementComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComplainedFromServer().then(res => {
            setComments(res.data);
        }).catch(err => console.log(err))
    }, [])

    const deleteComment = (comment) => {
        deleteFromServer(comment)
            .then(res => {
                const copy = comments.filter(x => x.id != comment.id)
                setComments(copy)
                let timerInterval;
                Swal.fire({
                    title: res.data,
                    html: "חובתינו לשמור על שפה ראויה",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                })
            }).catch(err => console.log(err))
    }
    const validComment = (comment) => {
        //updateserver
        // let [mag, setMsg] = useState();
        validFromServer(comment).then(res => {
            console.log(res)
            const copy = comments.filter(x => x.id != comment.id)
            setComments(copy)
            console.log("c", copy)
            console.log(comments)

            let timerInterval;
            Swal.fire({
                title: res.data,
                html: "חובתינו לשמור על שפה ראויה",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                           timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            })
        }).catch(err => console.log(err))

    }
    return (<>

        {comments.length === 0 ? <h2>שומרים על שפה נקייה באתר </h2> :
            comments.map(x => <> <h3>{x.desc}</h3>
                <Button onClick={() => deleteComment(x)}>הסתר תגובה</Button>
                <Button onClick={() => validComment(x)}>תגובה תקינה </Button>
            </>)}
    </>)
}