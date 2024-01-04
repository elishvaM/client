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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddAttraction({ setOpenAddItem }) {
  const [open, setOpen] = React.useState(true);
  let [file, setFile] = useState();
  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(false)
  };

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
          <TextField id="outlined-basic" label="שם האטרקציה" variant="outlined" sx={{ margin: "0px 20px 10px 0px" }} />
          <TextField id="filled-basic" label="תיאור" variant="filled" />
          <TextField id="standard-basic" label="Standard" variant="standard" sx={{ margin: 0.5 }} />
          {file === null ?
            <input type='file' label="kkk" onChange={(e) => {
              setFile(URL.createObjectURL(e.target.files[0]));
              { console.log(file) }
            }}
              name="chooseImg" /> : null}
          <img src={file} style={{ width: 70, height: 70 }} />
          <input
            accept={file}
            // className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button  variant="raised" component="span"
             onChange={(e) => {
              setFile(URL.createObjectURL(e.target.files[0]))
            }} label=" בחר תמונה" />
            {/* בחר תמונה */}
          </label>
          <img src={file} style={{ width: 70, height: 70 }} />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            הוסף
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}