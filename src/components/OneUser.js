import "../StyleComponents/OneUser.scss";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
export default function OneUser({ user }) {
    let n = user.Name[0]
    return <>
        <div className="container" >
            {/* <img src="image/" ></img> */}
            <img src="img_avatar.png" alt="Avatar" class="image"></img>
            {/* <img src="img_avatar.png" alt="Avatar" class="image"> */}
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{n}</Avatar>
            <div className="overlay">
                <div className="text" >
                    {user.Name} :שם
                    <br />
                     {user.NumList} :רשימות
                    <br />
                </div>
            </div>
        </div>
    </>
}