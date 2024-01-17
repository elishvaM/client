import "../StyleComponents/Login.scss";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutline from '@mui/icons-material/MailOutline';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import { saveUser } from "../store/actions/user";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { forgetPasswordFromServer, loginFromServer, sendEmailFromServer } from "../services/user";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { Email } from "@mui/icons-material";
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
const schema = yup.object({
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();

// 
export default function Login({ setOpen, Transition }) {
    const [openDialog, setOpenDialog] = React.useState(true);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isForget, setIsForget] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [user, setUser] = useState({});



    const vertical = 'top';
    const horizontal = 'center';
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)

    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [msg, setMsg] = useState("");
    React.useEffect(() => {
        if (!openDialog && !openSnack) {
            setOpen(false)
        }
    }, [openDialog, openSnack, setOpen])
    const dispatch = useDispatch();
    //the current user
    const save = (user) => {
        loginFromServer(user).then(res => {
            if (res.data.status === true) {
                dispatch(saveUser(res.data))
                setMsg(res.data.name + " טוב שחזרת ")
            }
            else
                setMsg("מצטערים, עקב דיווח רב על תגובותיך חשבונך הושהה");
        }).catch(err => {
            setMsg(err.response.data);
        }).finally(() => {
            setOpenSnack(true)
            setOpenDialog(false)
        })
    }
    const forgetPassword = () => {
        setIsForget(true);
    }
    const myEmail = (e) => {
        setMail(e.target.value);
    }
    const myPassrod = (e) => {
        setPassword(e.target.value);
    }
    const sendEmail = () => {
        sendEmailFromServer(mail, "שכחתי סיסמא").then(res => {
            console.log(res)
            setIsChecked(true);
        }).catch(err => console.log(err))
    }
    const checkPassword = () => {
        forgetPasswordFromServer(password, mail).then(res => {
            console.log(res.data)
            let user = {
                Email: mail,
                Password: res.data.password
            }
            save(user);
        }).catch(err => console.log(err))
    }
    return (<>
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={msg}
                key={vertical + horizontal}
            />
            <Dialog className="dialog" open={openDialog} onClose={() => setOpenDialog(false)} TransitionComponent={Transition}>
                <DialogTitle>שמחים שחזרת</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {!isForget ?
                            <form sx={{ m: 1, width: '25ch' }} variant="standard" onSubmit={handleSubmit(save)}>
                                <Input
                                    id="standard-adornment-password"
                                    {...register("Password")}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <div className="error">{errors.Password?.message}</div>
                                <Input
                                    id="standard-adornment-password"
                                    onChange={myEmail}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <MailOutline />
                                        </InputAdornment>
                                    }
                                />
                                <div className="error">{errors.Email?.message}</div>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined" onClick={forgetPassword}  >?שכחתי סיסמא</Button>
                                    <Button type="submit" variant="contained" >
                                        התחבר
                                    </Button>
                                </Stack>
                            </form> : <>
                                <Input
                                    onChange={myEmail}
                                    id="standard-adornment-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <MailOutline />
                                        </InputAdornment>
                                    }
                                />
                                <Button onClick={sendEmail} >שלח סיסמא חד פעמית</Button>
                            </>}
                        {isChecked ? <>
                            <Input
                                id="standard-adornment-password"
                                onChange={myPassrod}
                                placeholder="הקלד סיסמא חד פעמית"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <Button onClick={checkPassword} >שלח</Button>
                        </> : null}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    </>);
}