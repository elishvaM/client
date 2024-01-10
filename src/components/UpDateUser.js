import * as React from 'react';
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
import { TextField } from '@mui/material';
import { Button } from '@mui/base';
import { upDateFromServer } from '../services/user';
import { useDispatch } from 'react-redux';
import { saveUser } from '../store/actions/user';
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
        details.Stats = true;
        details.DateBorn = new Date();
        upDateFromServer(details).then(res => {
            dispatch(saveUser(res.data))
        }).catch(err => console.log(err))
    }
    return (<>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>

                <form onSubmit={handleSubmit(update)}>
                    <div>
                        <TextField id="outlined-basic" label="שם" variant="outlined" defaultValue={user.name}  {...register("Name")} />
                        <div className="error">{errors.Name?.message}</div>
                        <TextField id="outlined-basic" label="מייל" variant="outlined" defaultValue={user.email}  {...register("Email")} />
                        <div className="error">{errors.Email?.message}</div>
                        <TextField id="outlined-basic" label="טלפון" variant="outlined" defaultValue={user.phone}  {...register("Phone")} />
                        <div className="error">{errors.Phone?.message}</div>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="תאריך לידה"
                                    defaultValue={dayjs(user.dateBorn)}
                                    {...register("DateBorn")}
                                />
                            </DemoContainer>
                        </LocalizationProvider> */}
                        <div className="error">{errors.DateBorn?.message}</div>
                    </div>
                    {/* <InputLabel id="outlined-adornment-password">סיסמא</InputLabel> */}
                    <OutlinedInput
                        id="outlined-adornment-password"
                        label="סיסמא"
                        defaultValue={user.password}
                        type={showPassword ? 'text' : 'password'}
                        {...register("Password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="סיסמא"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button type="submit">עדכן</Button>
                </form>


                {/* <FormControl sx={{ m: 4, width: '25ch' }} variant="outlined" onSubmit={handleSubmit(update)}>
                    <div>
                        <InputLabel>סיסמא</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="סיסמא"
                            defaultValue={user.password}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="סיסמא"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="סיסמא"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <TextField id="outlined-basic" label="שם" variant="outlined" defaultValue={user.name}  {...register("Name")} />
                        <div className="error">{errors.DateBorn?.message}</div>
                        <TextField id="outlined-basic" label="מייל" variant="outlined" defaultValue={user.email}  {...register("Email")} />
                        <TextField id="outlined-basic" label="טלפון" variant="outlined" defaultValue={user.phone}  {...register("Phone")} />
                        <TextField type="date" id="outlined-basic" format="DD/MM/YYYY" label="תאריך לידה" variant="outlined"  {...register("DateBorn")} />

                        <Stack direction="row" spacing={2}>
                            <Button type='submit' variant="contained" endIcon={<SendSharpIcon />}>
                                עדכן
                            </Button>
                        </Stack>
                    </div>
                </FormControl> */}

            </div>


        </Box>
        {/* טופס מעוצב */}
        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <InputLabel htmlFor="outlined-adornment-password">Passwwwword</InputLabel>
                <OutlinedInput
                    sx={{ m: 1, mt: 0, width: '20ch' }}
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
                    label="Passsssword"
                />
                <FormControl sx={{ m: 1, mt: 0, width: '20ch', diraction: "rtl" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Passwwwword</InputLabel>
                    <OutlinedInput
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
                        label="Passsssword"
                    />

                </FormControl>
                <FormControl sx={{ m: 1, width: '42ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
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
                        label="Password"
                    />
                </FormControl>

            </div>
            <div>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
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
                    />
                </FormControl>

            </div>

        </Box> */}



    </>)
}
