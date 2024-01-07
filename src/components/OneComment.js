import { Button } from '@mui/base';
import moment from 'moment';
import { upDateCountFromServer } from '../services/comment';
export default function OneComment({ comment }) {
    const upDateCount = () => {
        upDateCountFromServer(comment).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }
    return (<>
        <div>
            <h4>{[moment(comment.date).format('DD/MM')]}</h4>
            <h3>{comment.desc}</h3>
            <Button onClick={() => upDateCount()}>דווח כפוגעני</Button>
        </div>

    </>)
}