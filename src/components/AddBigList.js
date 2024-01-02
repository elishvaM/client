import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LuggageIcon from '@mui/icons-material/Luggage';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Divider, autocompleteClasses } from '@mui/material';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from "moment";
import { saveDates } from '../store/actions/item';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTripListFromServer } from '../services/list';
export default function AddBigList({ setOpen, open, data, setData }) {

  let user = useSelector(s => s.user.currentUser);
  let [date, setDate] = React.useState(['', '']);
  const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-15", x => x.length >= 2 && x.length <= 15),
    //TravelingDate: yup.date().required("שדה חובה"),
    //BackingDate: yup.string().required("שדה חובה")
  }).required();

  let { register, handleSubmit, formState: { errors } } =
    useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const handleClose = () => {
    setOpen(false);
  };
  let dispatch = useDispatch()
  let copy;
  const createTripList = (details) => {
    details.UserId = user.id;
    details.BackingDate=date[1];
    details.TravelingDate=date[0];
    console.log("trip", details)
    AddTripListFromServer(details).then(res => {
      console.log("ressss")
      console.log(res)
      console.log(res.data)
          // {console.log(" be xdata",xdata)}
    copy = [...data, res.data]
    setData(copy);
      })
    .catch(err => console.log("err", err))
    setOpen(false);
    //dispatch(saveDates(date))
  };
  // { icon: <LuggageIcon />, label: details.Name }
  useEffect(() => { setOpen(true); }, [])
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
      ארגן טיול 
     </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: "100%" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"מלא את הפרטים"}
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(createTripList)}>
          <DialogContent sx={{ padding: 5 }} >
            <TextField id="outlined-basic" label="שם הטיול" variant="outlined"   {...register("Name")} />
            <div className="error">{errors.Name?.message}</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                  localeText={{ start: 'תאריך יציאה', end: 'תאריך חזרה' }}
                  format={'DD/MM/YYYY'}
                  onChange={(e) => {  
                   // setDate([moment(e[0]).format('DD-MM-YYYY'), moment(e[1]).format('DD-MM-YYY')])
                   //??? אומר שגיאה כשממלאים תיבת תאריך אחת ועדיין השניה ריקה
                   setDate([e[0]?.$d, e[1]?.$d])
                  // console.log([e[0].$d, e[1].$d])
                    //console.log(typeof (moment(e[0]).format('DD/MM/YYYY')))
                  }}
                  // {...register("BackingDate")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </DialogContent>

          <DialogActions>
            <Button onClick={()=>setOpen(false)}>בטל</Button>
            <Button type="submit"
              // onClick={createTripList}
              autoFocus>
              שמור
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
