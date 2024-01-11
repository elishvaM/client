import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItem, saveStorageTypes } from "../store/actions/item";
import { GetAllStorageTypesFromServer, addItemToSql } from "../services/item";
//select start
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel"; //switch
import Switch from "@mui/material/Switch"; //switch
import Stack from "@mui/material/Stack";
import "../StyleComponents/AddItem.scss";
import { useForm } from "react-hook-form";
//select end
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function AddItem({ setOpenAddItem }) {
  let {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors, dirtyFields, touchedFields, isDirty },
  } = useForm({ mode: "onTouched" });
  React.useEffect(()=>{GetAllStorageTypesFromServer().then(res=>
    dispatch(saveStorageTypes(res.data))
    ).catch(err=>"err "+ err)},[])
  let [file, setFile] = useState();
  let x = React.useRef();
  //select start
  const [age, setAge] = React.useState(["", ""]);
  const handleChange = (event) => {
    let copy = [...age];
    copy[event.target.name] = event.target.value;
    setAge(copy);
  };
  //select end

  const [open, setOpen] = React.useState(true);
  let [name, setName] = React.useState("");
  const [isNeedInsurance, setIsNeedInsurance] = React.useState(true);
  let dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setOpenAddItem(false);
  };
  const handleAddItem = () => {
    //e
    let item = {};

    // move_uploaded_file($_FILES['image']['tmp_name'],
    // '/public_html/images/'.$_FILES['image']['name']))
    console.log("file");
    console.log(file);
    //console.log($_FILES['image']['tmp_name'])
    //console.log($_FILES['image']['tmp_name'])

    // moveTo(file,
    // '/public/imgs/items/'+ file)

    let newItem = {
      name: name,
      isDuplicated: false,
      productTypeId: age[0],
      storageTypeId: age[1],
      isNeedAssurants: isNeedInsurance ? true : false,
      img: file,
      isImgConfirm: true,
      isConfirm: true,
      statusId: 1,
    };
    newItem.isSelected = false;
    let id;
    id += 1; //??? לא עובד... מה רק בסטייט? ואם כן למה ??id:id ,
    // addItemToSql(newItem).then(res=>
    //  newItem.Id = res.data).catch(error =>
    //  console.log("error in adding item")
    // )
    dispatch(addItem(newItem));
    handleClose();
  };
  let productTypes = useSelector((s) => s.item.productTypes);
  let storageTypes = useSelector((s) => s.item.storageTypes);

  return (
    <div>
      {/* ref={x} */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form method="POST" action="" enctype="multipart/form-data">
          {/* ??? יש ענין להכניס את כולם לתןך תגית פורם, כי אין שימוש בשליחת כל הנתונים לפונ */}
          {/* כלומר אפשר להקטין את הפורם רק להעלאת התמונה??? */}
          {/* onSubmit={handleSubmit(handleAddItem)} */}
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            הוספת פריט חדש
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {/* start form */}
            <div style={{ display: "flex" }}>
              <div style={{ display: "block" }}>
                <TextField
                  //??? מה לעשות אם בא לי רק את הבדיקת תקינות בלי השליחה
                  {...register("Name", {
                    minLength: 2,
                    maxLength: 30,
                    required: true,
                  })}
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label="שם הפריט"
                  variant="outlined"
                  sx={{ margin: "8px 20px 0px 0px" }}
                />
                {errors.Name && errors.Name.type == "required" && (
                  <div className="error">שם מוצר הוא שדה חובה</div>
                )}
                {errors.Name?.type == "minLength" && (
                  <div className="error">שם מוצר לפחות 2 תויים</div>
                )}
                {errors.Name?.type == "maxLength" && (
                  <div className="error">שם מוצר מקסימום 30 תוים</div>
                )}
              </div>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  סוג הפריט
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="productTypes"
                  name="0"
                  value={age[0]}
                  onChange={handleChange}
                >
                  {/* <MenuItem value="">
            <em>אף לא אחד</em>
          </MenuItem> */}
                  {productTypes.map((i) => (
                    <MenuItem value={i.id}>{i.type}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  סוג אחסון הפריט
                </InputLabel>

                <Select
                  labelId="demo-simple-select-filled-label"
                  id="storageTypes"
                  name="1"
                  value={age[1]}
                  onChange={handleChange}
                >
                  {/* <MenuItem value="">
            <em>אף לא אחד</em>
          </MenuItem> */}
                  {storageTypes.map((i) => (
                    <MenuItem value={i.id}>{i.type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <br />
            <br />
            <FormControlLabel
              sx={{ position: "absolute", right: "1.8rem" }}
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              onChange={() => setIsNeedInsurance(!isNeedInsurance)}
              label={
                isNeedInsurance ? " הפריט צריך ביטוח" : " הפריט לא צריך ביטוח"
              }
              labelPlacement="start"
            />
            {/* <br/>
      <p>uploading</p>
      <input type="file" name="choosefile" value="" />
      <button type="submit" name="uploadfile">
          UPLOAD
      </button> */}
            <br />
            <br />
            <input
              type="file"
              onChange={(e) => {
                console.log("lllll");
                console.log(e.target.files);
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
              name="choosefile"
            />
            <img src={file} style={{ width: 70, height: 70 }} />
            {/* className='add_pic' */}
            {/* <Button variant="outlined" >Outlined</Button>

      <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label" sx={{fontSize:16}}>
        הוסף תמונה
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack> */}

            {/* end form */}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              type="submit"
              name="uploadfile"
              sx={{ fontSize: 18 }}
              onClick={handleAddItem}
            >
              UPLOAD
              {/* הוסף את הפריט   */}
              {/* onClick={handleClose} */}
            </Button>
          </DialogActions>
        </form>
        <div id="display-image">
          {/* <?php
        $query = " select * from image ";
        $result = mysqli_query($db, $query);
 
        while ($data = mysqli_fetch_assoc($result)) {
    ?>
        <img src="./image/<?php echo $data['filename']; ?>">
 
    <?php
        }
    ?> */}
        </div>
      </BootstrapDialog>
    </div>
    ///
  );
}
