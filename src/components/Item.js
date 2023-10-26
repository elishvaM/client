import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../StyleComponents/Filter.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToMyList } from '../store/actions/item';
import { removeItemFromMyList } from '../store/actions/item';

export default function Item({item, all, setCntfrom, cntfrom}){
    
    let [arr, setArr]= useState([]);
    let [flag, setFlag] = useState(item.isSelected);
    let copy;
    let dispatch = useDispatch()
    const check=()=>{
      //??? check it, it change
      setFlag(!flag)

        //אם טרו צריך להוסיפו למערך
        if (flag == false){
          console.log("צריך להוסיף את הפריט")
         // copy = [...arr, item];
         // setArr(copy);
          setCntfrom(cntfrom+1)
          dispatch(addItemToMyList(item));
        }
        //אם פולס צריך להסירו מהמערך
        else if (flag == true){
          console.log("צריך להסיר את הפריט")

          //copy = arr.filter(i => i.Id != item.Id);
          //setArr(copy);
          setCntfrom(cntfrom-1)
          dispatch(removeItemFromMyList(item.Id));
        }
    }
    //let tempFlag = false;
    let itemsSelected = useSelector(s => s.item.itemsSelected);
    let is;
    const isdeleted = () =>{
      is = itemsSelected.find(x => x.Id == item.Id);
      if (is != null) //אם נמצא זא שלא מחקו אותו וצריך להשאר כלחוץ 
      return 'li-item li-pressed-item'
      //setFlag(false)
      return 'li-item'
    }
    return(<>
    {console.log(item.isSelected)}
            <li 
            // className={flag?'li-item li-pressed-item':'li-item'} 

            // className={flag?isdeleted():'li-item'} 
            className={flag?'li-item li-pressed-item':'li-item'} 

            key={item.Id}
            //???הסט לא משנה זה עובד לי הפוך כשפולס...
            //אפשר לגשת לסייט ולעדכנו בו זמנית במשתנים פרימיטיבייםtempFlag=!tempFlag
            onClick={()=>check()}>
             <Card sx={{ maxWidth: 340 , textAlign:"center",
                   borderRadius:"15px 15px 5px 5px"}}>
                <CardActionArea>

              <img src={item.Img} className='img' alt=""/>
              <p className='p'>{item.Name}</p>
              </CardActionArea>
              </Card>
            </li>
    </>)
}