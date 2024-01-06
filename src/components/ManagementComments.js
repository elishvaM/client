import { Button } from "@mui/base";
import { useEffect } from "react"
import { getComplainedFromServer, deleteFromServer } from "../services/comment";
import { useState } from "react";
export default function ManagementComments() {
    let [comments, setComments] = useState([]);
    let copy = [...comments]
    useEffect(() => {
        getComplainedFromServer().then(res => {
            setComments(res.data);
        }).catch(err => console.log(err))
    }, [comments])
    const deleteComment = (comment) => {
        deleteFromServer(comment).then(res => {
            alert(res.data)
        }).catch(err => console.log(err))
    }
    const validComment = (comment) => {
        let index = copy.indexOf(comment);
        //כן מוצא את התגובה אבל לא מוחק אותה
        copy.splice(index, 1)
        //יש בעיה בלדחוף מערך ריק לקיים?
        console.log(copy)
        setComments(copy);
    }
    return (<>

        {comments.length === 0 ? <h2>שומרים על שפה נקייה באתר </h2> :
            comments.map(x => <> <h3>{x.desc}</h3>
                <Button onClick={() => deleteComment(x)}>הסתר תגובה</Button>
                <Button onClick={() => validComment(x)}>תגובה תקינה </Button>
            </>)}
    </>)
}