import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
// import { useDispatch } from "react-redux";
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { saveUser } from "../store/actions/user";
import { sighinFromServer } from "../services/user";
import { useDispatch } from "react-redux";
import DialogActions from '@mui/material/DialogActions';
import MailOutline from '@mui/icons-material/MailOutline';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup";
import { getTodayDate } from "@mui/x-date-pickers/internals";
// import { saveUser } from "../store/actions/user";
const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    DateBorn: yup.date().required("שדה חובה").test('validDate', 'תאריך שגוי', x => x <= new Date()),
    Phone: yup.string().required("שדה חובה").test('len', "9-אורך בין 10", x => x.length >= 9 && x.length <= 10),
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 4-15", x => x.length >= 4 && x.length <= 15),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();
export default function SighIn({ open, setOpen, Transition }) {
    let { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });
    let dispatch = useDispatch();
    // let dispatch = useDispatch(state => state.user);
    //  let [msg, setMsg] = useState();
    //פונקציות של העין בסיסמא
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const save = (details) => {
        alert("הגיע")
        console.log("uuu",details)
        // //הוספת משתמש
        sighinFromServer(details).then(res => {
            console.log("sighin", res);
            dispatch(saveUser(res));
            alert("נרשם בהצלחה!" + details.Name)
        }).catch(err => { console.log("error",err); })
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (<>
   {console.log("ddd: ",new Date().toDateString)}
        <Dialog className="dialog" open={open} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle>שמחים שבאת</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form onSubmit={handleSubmit(save)}>
                        <div className='formdiv'>
                            <TextField id="outlined-basic" label="שם" variant="outlined"   {...register("Name")} />
                            <div className="error">{errors.Name?.message}</div>
                            <TextField id="outlined-basic" label="מייל" variant="outlined"   {...register("Email")} />
                            <div className="error">{errors.Email?.message}</div>
                            <TextField id="outlined-basic" label="טלפון" variant="outlined"   {...register("Phone")} />
                            <div className="error">{errors.Phone?.message}</div>
                            <TextField type="date" id="outlined-basic" label="תאריך לידה" variant="outlined"   {...register("DateBorn")} />
                            <div className="error">{errors.DateBorn?.message}</div>
                            <TextField id="outlined-basic" label="סיסמא" variant="outlined"   {...register("Password")} />
                            <div className="error">{errors.Password?.message}</div>
                            <DialogActions >
                                <Button onClick={handleClose}>ביטול</Button>
                                <Button type="submit">הרשם</Button>
                            </DialogActions>
                        </div>
                    </form>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </>)
}