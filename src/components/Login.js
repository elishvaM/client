import "../StyleComponents/Login.scss";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
// import { useState } from "react";
import * as React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutline from '@mui/icons-material/MailOutline';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import { saveUser } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { loginFromServer } from "../services/user";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useState } from "react";
// { minLength: 2, maxLength: 15, required: true }
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
const schema = yup.object({
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();


export default function Login({ open, setOpen, Transition }) {
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)

    });
    const [msg, setMsg] = useState([]);
    const mynavigate = useNavigate();

    const dispatch = useDispatch();
    //the current user
    const save = (user) => {
        loginFromServer(user).then(res => {
            console.log("ans", res)
            if (res.data.status === true) {
                dispatch(saveUser(res.data))
                setMsg(res.data.name + " טוב שחזרת ")
            }

            else
                //???מתי נשנה לפעיל
                setMsg("מצטרים, עקב דיווח רב על תגובותיך חשבונך הושהה");
            console.log("after: ", msg)
        }).catch(err => { setMsg(err.response.data); console.log(err.response.data) })
        alert("עברתי השרת")
        handleClick({ vertical: 'top', horizontal: 'center' })
       // setOpen(false);
        // חזרה לדף ההבית
        mynavigate("destinations")
    }
    //submit/cancel-dialog
    //const [open2, setOpen] = React.useState(false);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // })
    //??? דיאלוג לא נסגר

    const handleClose = () => {
        // alert(open2 + " " + open)
        setOpen(false);
        // open = open2;


    };
    // const LightTooltip = styled(({ className, ...props }) => (
    //     <Tooltip {...props} classes={{ popper: className }} />
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: theme.palette.common.black,
    //         boxShadow: theme.shadows[1],
    //         fontSize: 13,
    //     },
    // }));
    //start msg
    const [state, setState] = React.useState({
        open2: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open2 } = state;
    const handleClick = (newState) => () => {
        alert("came")
        setState({ ...newState, open2: true });
    };

    const handleClose2 = () => {
        setState({ ...state, open2: false });
    };
    //end msg
    return (<>
        <div>
            {/* <LightTooltip title="כניסה">
               <Button size="large" onClick={handleClickOpen}>< AccountCircleOutlinedIcon /> </Button>
            </LightTooltip> */}
            <h1>lghghgll</h1>
            <Dialog className="dialog" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle>שמחים שחזרת :)</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className="form" onSubmit={handleSubmit(save)} >
                            <div>

                                <Input
                                    label="סיסמא"
                                    error={errors.Password}
                                    {...register("Password")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PasswordOutlined />
                                        </InputAdornment>
                                    } />
                                <div className="error">{errors.Password?.message}</div>
                                <Input
                                    {...register("Email")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailOutline />
                                        </InputAdornment>
                                    }
                                />
                                <div className="error">{errors.Email?.message}</div>
                                <br />
                                <DialogActions >
                                    <Button onClick={handleClose}>ביטול</Button>
                                    <Button type="submit">התחבר</Button>
                                </DialogActions>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
                          {/* msg */}
            <Box sx={{ width: 500 }}>
                <h1>jghghh</h1>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open2}
                    onClose={handleClose2}
                    message={msg}
                    key={vertical + horizontal}
                />
            </Box>
        </div>
    </>);
}