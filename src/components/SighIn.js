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
// import { saveUser } from "../store/actions/user";
export default function Register() {
    let { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "onSubmit" });
    let dispatch = useDispatch(state => state.user);
    //  let [msg, setMsg] = useState();
    //פונקציות של העין בסיסמא
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const save = (details) => {
        alert("הגיע")
        // //הוספת משתמש
        sighinFromServer(details).then(res => {
            console.log(res);
            dispatch(saveUser(res));
            alert("נרשם בהצלחה!" + details.Name)
        }).catch(err => { console.log("err"); })
    }

    return (<>
        <div className='formdiv'><form onSubmit={handleSubmit(save)}>
            {/* <div>
                <TextField id="outlined-basic" required="true" label="שם מלא" variant="outlined" {...register("name", { minLength: 2, maxLength: 15, required: true })} />
                {errors.name && errors.name.type == "required" &&
                    <div className="error">
                        שם משתמש שדה חובה
                    </div>}
                {errors.name?.type == "minLength" &&
                    <div className="error">
                        שם משתמש לפחות 2 תויים
                    </div>}
                {errors.name?.type == "maxLength" &&
                    <div className="error">
                        שם משתמש מקסימום 15 תוים
                    </div>}
            </div> */}
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                    שם מלא
                </InputLabel>
                <Input
                    {...register("Name", { minLength: 2, maxLength: 15, required: true })}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
            {errors.Name && errors.Name.type === "required" &&
                <div className="error">
                    שם משתמש שדה חובה
                </div>}
            {errors.Name?.type === "minLength" &&
                <div className="error">
                    שם משתמש לפחות 2 תויים
                </div>}
            {errors.Name?.type === "maxLength" &&
                <div className="error">
                    שם משתמש מקסימום 15 תוים
                </div>}
            <br />
            <div>
                <TextField id="outlined-basic" label="מייל" required="true" variant="outlined" {...register("Email", { required: true, pattern: /^[0-9A-Za-z]{1,}@gmail.com$/ })} />
                {errors.Email?.type === "required" && <div className="error">
                    מייל הוא שדה חובה
                </div>}
                {errors.Email?.type === "pattern" && <div className="error">
                    מייל לא בתבנית הנכונה
                </div>}
            </div>
            <br />
            {/* <div>
                <TextField id="outlined-basic" required="true" label="אימות מייל" variant="outlined" {...register("confirmEmail", {
                    required: true, pattern: /^[0-9A-Za-z]{1,}@gmail.com$/, validate: (valu) => {
                        return valu === getValues("email");
                    }
                })} />

                {errors.confirmEmail?.type === "required" && <div className="error">
                    אימות מייל הוא שדה חובה
                </div>}
                {errors.confirmEmail?.type === "pattern" && <div className="error">
                    אימות מייל לא בתבנית הנכונה
                </div>}
                {errors.confirmEmail?.type === "validate" && errors.confirmEmail.dirtyFields && <div className="error">מייל לא תואם</div>}
            </div> */}
            <br />
            <FormControl sx={{ m: 1, width: '24ch' }} variant="outlined"  >
                <InputLabel required="true" >סיסמא</InputLabel>
                <OutlinedInput

                    {...register("Password", { minLength: 4, maxLength: 20, required: true })}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"

                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="סיסמא"
                />


            </FormControl>
            {errors.password && errors.password.type === "required" &&
                <div className="error">
                    סיסמא היא שדה חובה
                </div>}
            {errors.password?.type === "minLength" &&
                <div className="error">
                    סיסמא לפחות 5 תויים
                </div>}
            {errors.password?.type === "maxLength" &&
                <div className="error">
                    סיסמא מקסימום 15 תוים
                </div>}
            <br />
            <Button type="submit" variant="outlined">הרשם</Button>
        </form>
        </div>
        <br />
        {/* {msg ? <Alert severity="error" className="alert">{msg}</Alert> : null} */}
    </>)
}