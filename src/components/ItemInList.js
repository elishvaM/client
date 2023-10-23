// import * as React from 'react';
// import "../StyleComponents/Filter.scss";

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea, CardActions } from '@mui/material';

// import { useState } from "react";
// // import Input from '@mui/material/Input';

// // import Checkbox from '@mui/material/Checkbox';
// // import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// // import Favorite from '@mui/icons-material/Favorite';
// // import IconButton from '@mui/material/IconButton';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import CreateIcon from '@mui/icons-material/Create';
// // import Tooltip from '@mui/material/Tooltip';
// // import RemoveIcon from '@mui/icons-material/Remove';
// // import AddIcon from '@mui/icons-material/Add';
// // import CreateIcon from '@mui/icons-material/Create';
// // import Fab from '@mui/material/Fab';
// // import IconButton from '@mui/material/IconButton';
// // import Stack from '@mui/material/Stack';
// // import DeleteIcon from '@mui/icons-material/Delete';
// //start Dialog
// // import Button from '@mui/material/Button';
// // import Dialog from '@mui/material/Dialog';
// // import DialogActions from '@mui/material/DialogActions';
// // import DialogContent from '@mui/material/DialogContent';
// // import DialogContentText from '@mui/material/DialogContentText';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import useMediaQuery from '@mui/material/useMediaQuery';
// // import { useTheme } from '@mui/material/styles';
// //end Dialog

// //start select
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];
// //end select
// export default function ItemInList({item, setAmount, deleteItem}){
//     let [edit, setEdit] = useState(false);
//     const ariaLabel = { 'aria-label': 'description' };

//     //start Dialog
//     const [open, setOpen] = React.useState(false);
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
//     //end Dialog

//     //start select
//     const [personName, setPersonName] = React.useState([]);

//     const handleChange = (event) => {
//       const {
//         target: { value },
//       } = event;
//       setPersonName(
//         // On autofill we get a stringified value.
//         typeof value === 'string' ? value.split(',') : value,
//       );
//     };
//     //end select
//     return( <>
     
//       <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="100"
//           image={`/imgs/items/${item.Img}`}
//           alt="green iguana"
//         />
//    </CardActionArea>
//         <CardContent >
//           <Typography gutterBottom variant="h5" component="div">
//                {/* {edit?
//                <Input placeholder="שם הפריט" inputProps={ariaLabel} onMouseEnter={()=>setEdit(false)}/> :
//                <Input disabled defaultValue={item.Name} inputProps={ariaLabel} 
//                onDoubleClick={()=>setEdit(true)} /> }  */}

//                <Input disabled={!edit} placeholder="שם הפריט" defaultValue={item.Name}
//                 inputProps={ariaLabel} onDoubleClick={()=>setEdit(!edit)} /> 

//           </Typography>

//           <Typography variant="body2" color="text.secondary" >    
//             jhfdj udjsfgfdv fgfg fgfg fgfgwe3433 uu<br/>

//           </Typography>
//           </CardContent>
   

//       <Stack direction="row" spacing={10}>
//       {/* <CardActions  spacing={1}> */}
//       <Fab size="small"  aria-label="remove" onClick={()=>{setAmount(item.Id, -1)}}>
//              <RemoveIcon margin={10} />
//             </Fab>
//             <Typography>{item.Amount}</Typography>
            
//             <Fab size="small"  aria-label="add"  onClick={()=>{setAmount(item.Id, 1)}}>
//              <AddIcon />
//             </Fab>
//        {/* </CardActions> */}
       
//       </Stack>







//       <CardActions disableSpacing >
//       {/* <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/"+x.Id)}/></IconButton></Tooltip> */}

//       <IconButton aria-label="delete" onClick={handleClickOpen}>
//         <DeleteIcon  />
//       </IconButton>
//       🧊 ❄ 💧

//     </CardActions>
//     </Card>

//     <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"?האם את בטוח שברצונך למחוק"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {/* Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running. */}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             לא מסכים
//           </Button>
//           <Button onClick={()=>{deleteItem(item.Id)}} autoFocus>
//             מסכים
//           </Button>
//         </DialogActions>
//       </Dialog>

//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//                 <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Tag" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </> )
// }