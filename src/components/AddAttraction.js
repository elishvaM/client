import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Details } from '@mui/icons-material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const schema = yup.object({
  Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-50", x => x.length >= 2 && x.length <= 50),
  Desc: yup.string().required("שדה חובה").test('len', "אורך בין 10-4000", x => x.length >= 10 && x.length <= 4000),
  State: yup.string().required("שדה חובה"),
  Type: yup.string().required("שדה חובה"),
  Land: yup.string().required("שדה חובה").test('len', "אורך בין 2-20", x => x.length >= 2 && x.length <= 20),
  City: yup.string().required("שדה חובה").test('len', "אורך בין 2-20", x => x.length >= 2 && x.length <= 20),
}).required();
export default function AddAttraction({ setOpenAddItem }) {
  const [open, setOpen] = React.useState(true);
  let [file, setFile] = useState();
  const addAttraction = (details) => {
    console.log(details)
    handleClose();
  }
  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(false)
  };
  let { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(addAttraction)}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            הוספת אטרקציה
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <TextField id="outlined-basic" label="שם האטרקציה" variant="outlined" {...register("Name")} sx={{ margin: "0px 20px 10px 0px" }}
              placeholder={errors.Name ? errors.Name.message : "שם"} />
            <TextField id="filled-basic" label="תיאור" variant="filled" {...register("Desc")}
              placeholder={errors.Desc ? errors.Desc.message : "תיאור קצר"} />
            <TextField id="standard-basic" label="ארץ" variant="standard" {...register("Land")} sx={{ margin: 0.5 }}
              placeholder={errors.Land ? errors.Land.message : "ארץ"} />
            <TextField id="standard-basic" label="עיר" variant="standard" {...register("City")} sx={{ margin: 0.5 }}
              placeholder={errors.City ? errors.City.message : "עיר"} />
            {/* {file === null ?
            <input type='file' label="kkk" onChange={(e) => {
              setFile(URL.createObjectURL(e.target.files[0]));
              { console.log(file) }
            }}
              name="chooseImg" /> : null} */}
            {/* <img src={file} style={{ width: 70, height: 70 }} /> */}
            <input
              accept={file}
              // className={classes.input}
              style={{ display: 'none' }}
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]))
              }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button label="בחר תמונה" variant="raised" component="span"
                onChange={(e) => {
                  console.log(e)
                  setFile(URL.createObjectURL(e.target.files[0]))
                }} />
              בחר תמונה
            </label>
            <img src={file} style={{ width: 70, height: 70 }} />
          </DialogContent>
          <DialogActions>
            <Button autoFocus type='submit' >
              הוסף
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}