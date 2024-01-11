import { Button } from '@mui/base';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { upDateCountFromServer } from '../services/comment';
import Swal from 'sweetalert2';
export default function OneComment({ comment }) {
    const user = useSelector(state => state.user.currentUser);
    const upDateCount = () => {
        upDateCountFromServer(comment.id, user.id).then(res => {
            console.log(res)
            let timerInterval;
            Swal.fire({
                title: res.data,
                icon: "success",
                html: "מודים על דיווחך SmartLists צוות ",
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
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });


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