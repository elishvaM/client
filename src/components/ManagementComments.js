import { Button } from "@mui/base";
import { useEffect } from "react"
import { getComplainedFromServer, deleteFromServer, validFromServer } from "../services/comment";
import { useState } from "react";
import Swal from "sweetalert2";
import moment from 'moment';
export default function ManagementComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComplainedFromServer().then(res => {
            // date לפי החדש ביותר
            setComments(res.data.sort((a, b) => a.date < b.date ? 1 : -1));
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
        validFromServer(comment).then(res => {
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
    return (<>

        {comments.length === 0 ? <h2>שומרים על שפה נקייה באתר </h2> :
            comments.map(x => <> <h3>{x.desc}:{[moment(x.date).format('DD/MM')]}</h3>
                <Button onClick={() => deleteComment(x)}>הסתר תגובה</Button>
                <Button onClick={() => validComment(x)}>תגובה תקינה </Button>
            </>)}
    </>)
}