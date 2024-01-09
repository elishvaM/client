import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import { OutlinedInput } from '@mui/material';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';
const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    DateBorn: yup.date().required("שדה חובה").test('validDate', 'תאריך שגוי', x => x <= new Date()),
    Phone: yup.string().required("שדה חובה").test('len', "9-אורך בין 10", x => x.length >= 9 && x.length <= 10),
    Password: yup.string().required("שדה חובה").test('len', "אורך בין 4-15", x => x.length >= 4 && x.length <= 15),
    Email: yup.string().required("שדה חובה").test('len', "אורך בין 2-25", x => x.length >= 2 && x.length <= 25)
        .email('מייל לא תקין'),
}).required();
export default function UpDateUser() {
    const user = useSelector(state => state.user.currentUser);
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const save = () => {

    }
    return (<>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FormControl sx={{ m: 4, width: '25ch' }} variant="outlined" onSubmit={handleSubmit(save)}>
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
                        <TextField id="outlined-basic" label="מייל" variant="outlined"  defaultValue={user.email}  {...register("Email")} />
                        <TextField id="outlined-basic" label="טלפון" variant="outlined" defaultValue={user.phone}  {...register("Phone")} />
                        <TextField type="date" id="outlined-basic" format="DD/MM/YYYY" label="תאריך לידה" variant="outlined"  {...register("DateBorn")} />
                    
                    
                    </div>
                </FormControl>

            </div>


        </Box>



    </>)
}
