import { Button } from "@mui/base";
import { useEffect } from "react"
import { getComplainedFromServer, deleteFromServer } from "../services/comment";
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
                    icon: "success",
                    //   html: "צוות האתר",
                    timer: 1500,
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
        const copy = comments.filter(x => x.id != comment.id)
        setComments(copy)
        let timerInterval;
        Swal.fire({
            title: "התגובה עודכנה בהצלחה",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    //   timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
    }
    return (<>

        {comments.length === 0 ? <h2>שומרים על שפה נקייה באתר </h2> :
            comments.map(x => <> <h3>{x.desc}</h3>
                <Button onClick={() => deleteComment(x)}>הסתר תגובה</Button>
                <Button onClick={() => validComment(x)}>תגובה תקינה </Button>
            </>)}
    </>)
}