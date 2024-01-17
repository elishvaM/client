import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { saveUser } from "../store/actions/user";
import { sighinFromServer } from "../services/user";
import { useDispatch } from "react-redux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import { Snackbar } from "@mui/base";
const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    Phone: yup.string().required("שדה חובה").test('len', "9-אורך בין 10", x => x.length >= 9 && x.length <= 10),
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 4-10", x => x.length >= 4 && x.length <= 10),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();
export default function SighIn({ open, setOpen, Transition }) {
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const mynavigate = useNavigate();
    const [openDialog, setOpenDialog] = React.useState(true);
    const [openSnack, setOpenSnack] = React.useState(false);
    const vertical = 'top';
    const horizontal = 'center';
    const [msg, setMsg] = React.useState("");
    React.useEffect(() => {
        if (!openDialog && !openSnack) {
            setOpen(false)
        }
    }, [openDialog, openSnack, setOpen])
    //פונקציות של העין בסיסמא
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const save = (details) => {
        //אימות מייל ואם חזר חיובי להמשיך
        sighinFromServer(details).then(res => {
            dispatch(saveUser(res.data));
            setMsg(res.data.name+"נרשמת בהצחה,")

        }).catch(err =>  setMsg(err.response.data)).finally(() => {
            setOpenSnack(true)
            setOpenDialog(false)
        })
        mynavigate("destinations")
        handleClose();
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (<>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={() => setOpenSnack(false)}
            message={msg}
            key={vertical + horizontal}
        />
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
            <DialogTitle>שמחים שבאת</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <form sx={{ margin: "3px" }} onSubmit={handleSubmit(save)}>
                        <div className='formdiv'>
                            <TextField id="outlined-basic" label="שם" variant="outlined"   {...register("Name")} />
                            <div className="error">{errors.Name?.message}</div>
                            <TextField id="outlined-basic" label="מייל" variant="outlined"   {...register("Email")} />
                            <div className="error">{errors.Email?.message}</div>
                            <TextField id="outlined-basic" label="טלפון" variant="outlined"   {...register("Phone")} />
                            <div className="error">{errors.Phone?.message}</div>
                            <FilledInput
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="סיסמא"
                                sx={{ width: "25ch" }}
                                {...register("Password")}
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
                            />
                            <div className="error">{errors.Password?.message}</div>



                            <DialogActions >
                                <Button onClick={handleClose}>ביטול</Button>
                                <Button type="submit">הרשם</Button>
                            </DialogActions>
                        </div>
                    </form>

                    {/* <Box sx={{
                        display: 'flex',
                        flexWrap: "wrap",
                        width: '45ch',
                        margin: "auto",
                        marginTop: "10vh",
                        textAlign: "center"
                    }} onSubmit={handleSubmit(save)}>
                        <form>
                            <div>
                                <OutlinedInput
                                    sx={{ m: 1, mt: 0, width: '20ch' }}
                                    id="outlined-adornment-password"
                                    placeholder={errors.Name ? errors.Name.message : "שם"}
                                    {...register("Name")}
                                />
                                <FormControl sx={{ m: 1, mt: 0, width: '20ch', diraction: "rtl" }} variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder={errors.Phone ? errors.Phone.message : "טלפון"}
                                        {...register("Phone")}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '42ch' }} variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder={errors.Email ? errors.Email.message : "מייל"}
                                        {...register("Email")}
                                    />
                                </FormControl>

                            </div>
                            <div>

                                <FormControl sx={{ m: 2, width: '42ch', mt: 1 }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">סיסמא</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={errors.Password ? errors.Password.message : "סיסמא"}
                                        {...register("Password")}
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
                                    />
                                </FormControl>

                            </div>
                            <Button variant="contained" type='submit' sx={{ margin: "auto" }}>הרשם</Button>
                            <Button onClick={handleClose}>ביטול</Button>
                        </form>
                    </Box>
 */}


                </DialogContentText>
            </DialogContent>
        </Dialog>
    </>)
}