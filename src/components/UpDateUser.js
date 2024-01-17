import * as React from 'react';
import "../StyleComponents/UpDateUser.scss";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import { OutlinedInput } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { upDateFromServer } from '../services/user';
import { useDispatch } from 'react-redux';
import { saveUser } from '../store/actions/user';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    //  DateBorn: yup.date().required("שדה חובה").test('validDate', 'תאריך שגוי', x => x <= new Date())
    // moment(new Date()).format("DD/MM/YYYY")) לא מבצע בדיקה עליו
    Phone: yup.string().required("שדה חובה").test('len', "9-אורך בין 10", x => x.length >= 9 && x.length <= 10),
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 4-15", x => x.length >= 4 && x.length <= 15),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();
export default function UpDateUser() {
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const update = (details) => {
        details.Id = user.id;
        details.Type = "משתמש"
        details.UserTypeId = 1;
        details.Status = true;
        details.DateBorn = new Date();
        upDateFromServer(details).then(res => {
            dispatch(saveUser(res.data))
            let timerInterval;
            Swal.fire({
                title: "הפרטים עודכנו בהצלחה",
                icon: "success",
                html: "SmartLists צוות ",
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
        {/* טופס מעוצב */}
        <Box  sx={{
            display: 'flex',
            flexWrap: "wrap",
            width: '45ch',
            margin: "auto",
            marginTop:"10vh",
            textAlign:"center"
        }} onSubmit={handleSubmit(update)}>
            <form>
                <div>
                    <OutlinedInput
                        sx={{ m: 1, mt: 0, width: '20ch' }}
                        id="outlined-adornment-password"
                        placeholder={errors.Name ? errors.Name.message : "שם"}
                        defaultValue={user.name}
                        {...register("Name")}
                    />
                    <FormControl sx={{ m: 1, mt: 0, width: '20ch', diraction: "rtl" }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder={errors.Phone ? errors.Phone.message : "טלפון"}
                            defaultValue={user.phone}
                            {...register("Phone")}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '42ch' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder={errors.Email ? errors.Email.message : "מייל"}
                            defaultValue={user.email}
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
                            defaultValue={user.password}
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
                <Button variant="contained" type='submit' sx={{margin:"auto"}}> שמור</Button>
            </form>
        </Box>
    </>)
}
