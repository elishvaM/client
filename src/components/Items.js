import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import "../StyleComponents/Filter.scss";
import Item from './Item';
import { useSelector, useDispatch } from 'react-redux';
import { saveItems } from '../store/actions/item';

export default function Items({type, setValuefrom , valuefrom}) {
  let dispatch = useDispatch();
  let [flag, setFlag] = useState(false);
  let [cnt, setCnt] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    //דיספלי משמש גם לפתיחה וסגירת הפריטים וגם עוזר לנו לדעת איזה פריטים להציג
    //ברגע שהוא אפס זא אל תפתח הצגת פריטים או סגור אותה וברגע שנפתחת הערת הנמצא 
    //במשתנה זה תגיד לנו איזה סוג פריטים להציג 
    setValuefrom(0);
    setOpen(false);
  };
  
  const descriptionElementRef = React.useRef(null);
 
  let allitems = useSelector(s => s.item.allitems);//??? מה קורה מאחורי הקלעים אם הלך לשרת ואם לא
  let itemsByType = allitems.filter(item => item.ProductTypeId == valuefrom);
  React.useEffect(() => {  
    setOpen(true);
    // handleClickOpen();
  }, []);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  // let arr = [
  //   {Id:1, Img:"Cloth027.JPG", name:"משקפי שמש"},
  //   {Id:2, Img:"Household 778.jpg", name:"כובע"},
  //   {Id:3, Img:"Perfume Bottle.jpg", name:"נעלי ספורט"},
  //   {Id:4, Img:"Hair Brush.jpg", name:"כסף"},
  //   {Id:5, Img:"Household 487.jpg", name:"מטען"},
  //   {Id:6, Img:"Cloth027.JPG", name:"בקבוק מים"},
  //   {Id:7, Img:"Household 778.jpg", Name:"כובע שמש"},
  //   {Id:8, Img:"Perfume Bottle.jpg",Name:"משקפי שמש"},
  //   {Id:9, Img:"Hair Brush.jpg",Name:"קרם הגנה"},
  //   {Id:10, Img:"Household 487.jpg",Name:"מסרק"},
  //   {Id:11, Img:"Cloth027.JPG", Name:"מצלמה"}
  // ]

const addItem=(x)=>{
    
}
  return (
    <div>
      {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth={70}
        height={70}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
            {type}
        </DialogTitle>
        {/* <p onClick={()=>{setFlag(false)}}>בטל הכל</p> */}
        {/* <p onClick={()=>{setFlag(true)}}>סמן הכל</p> */}
        <DialogTitle id="scroll-dialog-title">{`פריטים נבחרו ${cnt} / ${itemsByType.length}`}</DialogTitle>
        {/* <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent> */}
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            
            <ul className='ul-item'>
              {itemsByType.map((item) =>
                   <Item item={item} all={flag} setCntfrom={setCnt} cntfrom={cnt}/>
              )}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}