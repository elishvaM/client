import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
import "../StyleComponents/ItemsOptions.scss"
import { useDispatch, useSelector } from 'react-redux';
// import { updateItemsSelected } from '../store/actions/item';
import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
//start Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { hiIN } from '@mui/material/locale';
import AddBigList from './AddBigList';
import AddItem from './AddItem';
//end Dialog
// import { withStyles } from '@material-ui/core/styles';
// const styles = {
//   button: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

//   },
// };
export default function ItemsOptions({ setColorDelete, itemSelectedNew }) {
  //start Dialog
  const [open, setOpen] = React.useState(false);
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
    setColorDelete(false)
  };
  const handleClose = () => {
    setOpen(false);
  };
  //end Dialog
  let dispatch = useDispatch()
  const deleteRealy = () => {
    console.log("FFFf", itemSelectedNew)
    // dispatch(updateItemsSelected(itemSelectedNew));
    handleClose();
    // copy = [] // מרוקנת לפעם הבאה
    // dispatch(removeItem(item.Id))
  }
  let [del_Btn, setDel_Btn] = useState(true);
  // let itemsSelected = useSelector(s => s.item.itemsSelected);
  // let copy = [...itemsSelected]
  // const deleteItemSelected = (id) =>{
  //     copy = copy.filter(x => x.Id != id)
  //     // setProduct(copy)
  //  }

  return (<>
    <div className='wrapOptions'>
      <CardActions>
        {del_Btn ?
          <DeleteIcon fontSize="medium" color='disabled' className='delete-icon' sx={{padding: 0.85,borderRadius: '4px 0px 0px 4px', border: '1px solid'}}/> 
          :
          <IconButton aria-label="delete" size="large" sx={{padding: 0.15,borderRadius: '4px 0px 0px 4px', border: '1px solid rgba(25, 118, 210, 0.5)', marginRight: -1}}
            className='delete-icon' onClick={()=>handleClickOpen()}>
            <DeleteIcon fontSize="large" color="primary" />
          </IconButton>}

        {/* לוודא שזה נכון שזה לא הפוך בלחיצות כמו שקורה ... ??*/}
        <Button variant="outlined"
          //  className={props.classes.button}
          className='delete-btn'
          disabled={!del_Btn}
          onClick={() => { setDel_Btn(!del_Btn); setColorDelete(true) }}
          sx={{ borderRadius: "0px 4px 4px 0px", fontSize: "0.975rem" }}
        >
          מחיקה
        </Button>
       


        <AddIcon color="primary" sx={{
          border: "2px solid rgb(217, 214, 214)",
          borderRadius: 3, padding: 0.7,
        }} onClick={() => setOpenAddItem(true)} />
      </CardActions>
    </div>
    {openAddItem ? <AddItem setOpenAddItem={setOpenAddItem} /> : null}
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"

    >
      <DialogTitle id="responsive-dialog-title" sx={{ width: "20vw" }}>
        {"?האם את בטוח שברצונך למחוק"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => { setDel_Btn(!del_Btn); handleClose() }}>
          לא מסכים
        </Button>
        <Button onClick={() => { setDel_Btn(!del_Btn); deleteRealy() }} autoFocus>
          מסכים
        </Button>
      </DialogActions>
    </Dialog>

  </>)
}

// export default withStyles(styles)(ItemsOptions);