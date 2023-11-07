import { useEffect, useState } from "react"
import { usersFromServer } from "../services/user"
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from "@mui/base";
import { useDispatch } from "react-redux";
import { changeStatusFromServer } from "../services/user"
export default function ManagementUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        usersFromServer().then(res => {
            setUsers(res.data)
            console.log("before:",res.data)
        }).catch(err => console.log(err))
        //מביא הערה על המערך הריק שכאן
    }, []);
    //משנה סטטוס בשרת ולא בתצוגה
    const handleChange = (user) => {
        console.log("uu",user.user)
        changeStatusFromServer(user.user).then(res => {
            console.log("res",res);
            console.log("after:", users);
        }).catch(err => { console.log("error", err) });
    };
    return (<>
        <ul>
            {users.map(user => <li key={user.id}>{user.name+" "+user.status}
                 <Button onClick={() => handleChange({ user })} >שינוי סטטוס</Button>

                {/* {user.status === false ? <FormControlLabel
                    control={
                        <Switch checked={false} onChange={handleChange(user)} />
                    }
                /> : <FormControlLabel
                    control={
                        <Switch checked={true} onChange={handleChange(user)} />
                    }
                />} */}

            </li>)}
        </ul>


    </>)
}