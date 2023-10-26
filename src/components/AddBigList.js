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
export default function AddBigList({setOpen, open, data, setData}) {
  let { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: "onSubmit" });
  let user = useSelector(s => s.user.currentUser);
  let [date, setDate] = React.useState(['','']);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
let dispatch = useDispatch()
  let xdata;
  const createTripList = (details) => {
    // console.log("det ")
    // console.log(details)
    setOpen(false);
    
    // {console.log("be data",data)}
    details.UserId = user.Id;
    details.AddingDate = new Date().toLocaleString() + "";
    console.log(details.AddingDate)
    // {console.log(" be xdata",xdata)}
    xdata = [...data, { icon: <LuggageIcon />, label: details.Name }]
    // {console.log(" af xdata",xdata)}
    setData(xdata);
    // {console.log(" af data",data)}
    console.log("date", date)
     dispatch(saveDates(date))
  };
  // useEffect(()=>{setOpen(true);},[])
  return(
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
      ארגן טיול 
     </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{width:"100%" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"מלא את הפרטים"}
        </DialogTitle>
        <Divider/>
        <form onSubmit={handleSubmit(createTripList)}>
        <DialogContent sx={{padding:5}} >
            <div>
      <TextField id="standard-basic" label="שם הרשימה" variant="standard"     
         color="warning"  sx={{marginBottom:5}}  focused
         {...register("Name", { minLength: 2, maxLength: 60, required: true, 
            existsName: (val) => { let s = data.find(i => i.label == val)
             return s != undefined;// ??? dont work
            }
          })}
          />

         {errors.Name && errors.Name.type == "required" &&
                    <div className="error">
                        שם הרשימה הוא שדה חובה
                    </div>}
                {errors.Name?.type == "minLength" &&
                    <div className="error">
                        שם הרשימה לפחות 2 תוים
                    </div>}
                {errors.Name?.type == "maxLength" &&
                    <div className="error">
                        מספר התווים מוגבל
                    </div>}
                    {errors.Name?.type == "existsName" &&
                    <div className="error">
                      יש לך רשימה בשם זה
                    </div>}
            </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
         localeText={{ start: 'תאריך יציאה', end: 'תאריך חזרה' }} 
         onChange={(e)=>{
          //setDate([moment(e[0]).format('YYYY-MM-DD'), moment(e[1]).format('YYYY-MM-DD')])
          setDate([e[0].$d, e[1].$d])
          console.log(typeof(moment(e[0]).format('DD/MM/YYYY')))
        }}
        //  {...register("Date"
        //  , { 
        //   // minLength: 2, maxLength: 60, required: true, 
        //   // existsName: (val) => { let s = data.find(i => i.label == val)
        //   //  return s != undefined; }// ??? dont work
        //   }
        // )}
         />
      </DemoContainer>
    </LocalizationProvider>   
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>בטל</Button>
          <Button type="submit"
          //  onClick={handleClose}
           autoFocus>
            שמור
          </Button>
        </DialogActions> 
        </form>
      </Dialog>
    </div>
  );
}
