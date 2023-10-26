import * as React from 'react';
import "../StyleComponents/Filter.scss";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/actions/item';
import { useState } from "react";
import Input from '@mui/material/Input';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
// import IconButton from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import CreateIcon from '@mui/icons-material/Create';
// import Tooltip from '@mui/material/Tooltip';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
//start Dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//end Dialog
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
//start select
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
//end select

export default function ItemInList({item, setAmount}){//, deleteItem מהקומפ הקודמת
    let [edit, setEdit] = useState(false);
    const ariaLabel = { 'aria-label': 'description' };

    //start Dialog
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    //end Dialog
    let [name, setName] = useState("")
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    //start select
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
      const {target: { value },} = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    //end select
    const customList = (items) => (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
  
            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
    let itemsSelected = useSelector(s => s.item.itemsSelected);
    let dispatch = useDispatch()
    const deleteItem = () =>{
      dispatch(removeItem(item.Id))
    }
    return( <>
     
      <Card sx={{ maxWidth: 345 , borderRadius: '70px 70px 70px 70px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={`/imgs/items/${item.Img}`}
          alt="green iguana"
        />
   </CardActionArea>
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
               {/* {edit?
               <Input placeholder="שם הפריט" inputProps={ariaLabel} onMouseEnter={()=>setEdit(false)}/> :
               <Input disabled defaultValue={item.Name} inputProps={ariaLabel} 
               onDoubleClick={()=>setEdit(true)} /> }  */}

               <Input disabled={!edit} placeholder="שם הפריט" defaultValue={item.Name}
                inputProps={ariaLabel} onDoubleClick={()=>setEdit(!edit)} /> 

          </Typography>

          <Typography variant="body2" color="text.secondary" >    
            jhfdj udjsfgfdv fgfg fgfg fgfgwe3433 uu<br/>

          </Typography>
          </CardContent>
   

      <Stack direction="row" spacing={10}>
      {/* <CardActions  spacing={1}> */}
      <Fab size="small"  aria-label="remove" onClick={()=>{setAmount(item.Id, -1)}}>
             <RemoveIcon margin={10} />
            </Fab>
            <Typography>{item.Amount}</Typography>
            
            <Fab size="small"  aria-label="add"  onClick={()=>{setAmount(item.Id, 1)}}>
             <AddIcon />
            </Fab>
       {/* </CardActions> */}
       
      </Stack>



      <CardActions disableSpacing >
      {/* <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/"+x.Id)}/></IconButton></Tooltip> */}

      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon  />
      </IconButton>
      🧊 ❄ 💧

    </CardActions>
    </Card>

    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
       
      >
        <DialogTitle id="responsive-dialog-title"  sx={{width:"20vw"}}>
          {"?האם את בטוח שברצונך למחוק"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            לא מסכים
          </Button>
          <Button onClick={()=>{deleteItem(item.Id)}} autoFocus>
            מסכים
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Grid item>{customList(left)}</Grid> */}
    </> )
}
