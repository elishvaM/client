import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Button } from "@mui/base";
import { addCommentFromServer, getAllCommentsFromServer } from "../services/comment";
export default function OneDestinationDetails() {
    const chosenAttraction = useSelector(state => state.attraction.selectedAttraction);
    let [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState({});
    let user = useSelector(state => state.user.currentUser);
    React.useEffect(() => {
        getAllCommentsFromServer(chosenAttraction?.id).then(res => {
            setComments(res.data)
        }).catch(err => console.log(err))
    }, [chosenAttraction]);
    const addComment = (desc) => {
        const addC = {
            id: 0,
            desc: desc,
            userId: user.id,
            attractionId: chosenAttraction?.id
        }
        addCommentFromServer(addC).then(res => {
            setComments(...comments,res.data);
        }).catch(err => console.log("err add", err))
    }
    return (
        <>
            <h2>{chosenAttraction.name}</h2>
            <h2>{chosenAttraction.desc}</h2>
            <img src={`/imgs/att/${chosenAttraction.img}`} sx={{ width: 50 }} alt={chosenAttraction.name} />
            <h2>{chosenAttraction.websiteAddress}</h2>
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
                <TextField
                    // {...setComment(value)}
                    id="outlined-textarea"
                    label="הוספת תגובה"
                    placeholder="כתוב כאן"
                    multiline
                    onChange={(e) => { setComment(e.target.value) }}
                />
                <Button onClick={() => addComment(comment)} >הוסף</Button>
            </div>
            {comments.map(x => <h3>{x.desc}</h3>)}
        </>
    )
}