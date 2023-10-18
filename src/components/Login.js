import "../StyleComponents/Login.scss";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { useState } from "react";
import * as React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutline from '@mui/icons-material/MailOutline';
import PasswordOutlined from '@mui/icons-material/PasswordOutlined';
import { useDispatch } from "react-redux";
import { saveUser } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import { loginFromServer } from "../services/user";
export default function Login({open,Transition}) {
    let { register, handleSubmit, getValues, formState: { isValid, errors, dirtyFields, touchedFields, isDirty } } = useForm({ mode: "onSubmit" });
    let [msg, setMsg] = useState();
    let mynavigate = useNavigate();

    let dispatch = useDispatch();
    const save = (user) => {
        alert(user.Password)
        loginFromServer(user).then(res=>{
            // if(res.data)
            console.log(res)
            console.log("data"+res.data) 
            console.log("user"+res.data.user) 
             dispatch(saveUser(user))
        }).catch(err => {console.log(err); console.log("faild")})
       
        // חזרה לדף ההבית
        mynavigate("destinations")
    }

     //submit/cancel-dialog
    const [open2, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    // })
    //??? דיאלוג לא נסגר
    
    const handleClose = () => {
        alert(open2 +" "+open)
        setOpen(false);
        open=open2;
    };
    let cnt = 0;


    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
            boxShadow: theme.shadows[1],
            fontSize: 13,
        },
    }));

    return (<>
        <div>
            {/* <LightTooltip title="כניסה">
               <Button size="large" onClick={handleClickOpen}>< AccountCircleOutlinedIcon /> </Button>
            </LightTooltip> */}
            <Dialog className="dialog" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle>שמחים שחזרת :)</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form className="form" onSubmit={handleSubmit(save)} >
                            <div>
                                    {/* <InputLabel htmlFor="input-with-icon-adornment">
                                        סיסמא
                                    </InputLabel> */}
                                    <Input
                                    label="סיסמא"
                                        {...register("Password", { minLength: 2, maxLength: 15, required: true })}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PasswordOutlined />
                                            </InputAdornment>
                                        }   />
                                {errors.Password && errors.Password.type == "required" &&
                                    <div className="error">
                                        סיסמא שדה חובה
                                    </div>}
                                {errors.Password?.type == "minLength" &&
                                    <div className="error">
                                        סיסמא לפחות 5 תויים
                                    </div>}
                                {errors.Password?.type == "maxLength" &&
                                    <div className="error">
                                        סיסמא מקסימום 15 תוים
                                    </div>}

                                {/* מייל */}
                                {/* <InputLabel htmlFor="input-with-icon-adornment">
                                    מייל
                                </InputLabel> */}
                                <Input
                                    {...register("Email", { minLength: 2, maxLength: 50, required: true })}
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailOutline />
                                        </InputAdornment>
                                    }
                                />
                                {errors.Email?.type == "required" && <div className="error">
                                    מייל הוא שדה חובה
                                </div>}
                                {errors.Email?.type == "maxLength" && <div className="error">
                                    מייל הוא שדה חובה
                                </div>}
                                {errors.Email?.type == "pattern" && <div className="error">
                                    מייל לא יותר מ 50 תוים
                                </div>}
                                {errors.Email?.type == "minLength" && <div className="error">
                                    מייל לא פחות מ 2 תוים
                                </div>}
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
        </div>
    </>);
}