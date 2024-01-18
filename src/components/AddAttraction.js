import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Details } from '@mui/icons-material';
import { addAttractionFromServer } from '../services/attraction';
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
  Desc: yup.string().required("שדה חובה").test('len', "אורך בין 10-400", x => x.length >= 10 && x.length <= 400),
  State: yup.string().required("שדה חובה"),
  WebsiteAddress: yup.string().required("שדה חובה"),
  Type: yup.string().required("שדה חובה"),
  Land: yup.string().required("שדה חובה").test('len', "אורך בין 2-20", x => x.length >= 2 && x.length <= 20),
  City: yup.string().required("שדה חובה").test('len', "אורך בין 2-20", x => x.length >= 2 && x.length <= 20),
  Img: yup.string().required("שדה חובה")
}).required();
export default function AddAttraction() {
  const [open, setOpen] = React.useState(true);
  let [file, setFile] = useState();
  let [file2, setFile2] = useState();
  let [file3, setFile3] = useState();

  const handleClose = () => {
    setOpen(false);
    // setOpenAddItem(false)
  };
  let { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });
  const addAttraction = (details) => {


    // {
    //   "id": 0,
    //   "name": "string",
    //   "desc": "string",
    //   "img": "string",
    //   "img2": "string",
    //   "img3": "string",
    //   "websiteAddress": "string",
    //   "isConfirm": true,
    //   "address": {
    //     "id": 0,
    //     "land": "string",
    //     "city": "string",
    //     "street": "string",
    //     "number": 0
    //   },
    //   "status": true,
    //   "personStateId": 0,
    //   "typeId": 0,
    //   "addressId": 0,
    //   "countryId": 0,
    //   "state": "string",
    //   "type1": "string"
    // }
    alert("kkkk")
    details.IsConfirm = true;
    details.Img = file;
    details.Img3 = file;
    details.Img2 = file;
    details.Status = true;
    addAttractionFromServer(details).then(res => {
      console.log(res);
    }).catch(err => console.log(err))
    console.log("ddd", details)

    // handleClose();
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
          <form onSubmit={handleSubmit(addAttraction)}>
            <TextField id="outlined-basic" label="שם האטרקציה" variant="outlined" {...register("Name")} sx={{ margin: "0px 20px 10px 0px" }}
              placeholder={errors.Name ? errors.Name.message : "שם"} />
            <TextField id="filled-basic" label="תיאור" variant="filled" {...register("Desc")}
              placeholder={errors.Desc ? errors.Desc.message : "תיאור קצר"} />
            <TextField id="standard-basic" label="כתובת אתר" variant="standard" {...register("WebsiteAddress")} sx={{ margin: 0.5 }}
              placeholder={errors.WebsiteAddress ? errors.WebsiteAddress.message : "כתובת אתר"} />
            <TextField id="standard-basic" label="ארץ" variant="standard" {...register("Land")} sx={{ margin: 0.5 }}
              placeholder={errors.Land ? errors.Land.message : "ארץ"} />
            <TextField id="standard-basic" label="עיר" variant="standard" {...register("City")} sx={{ margin: 0.5 }}
              placeholder={errors.City ? errors.City.message : "עיר"} />
            <TextField id="standard-basic" label="גיל" variant="standard" {...register("State")} sx={{ margin: 0.5 }}
              placeholder={errors.State ? errors.State.message : "גיל"} />
            <TextField id="standard-basic" label="סוג" variant="standard" {...register("Type")} sx={{ margin: 0.5 }}
              placeholder={errors.Type ? errors.Type.message : "סוג"} />
            <input
              accept={file}
              {...register("Img")}
              style={{ display: 'none' }}
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]))
              }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <img src={file} style={{ width: 70, height: 70 }}
                onChange={(e) => {
                  console.log("eeeeee", e.target.files[0])
                  setFile(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </label>
            <Button type="submit" >
              הוסף
            </Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}