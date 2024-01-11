import { green } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import "../StyleComponents/Item.scss";
export default function Beauty({item, colorDelete, copy, itemsSelectedNew, setItemsSelectedNew}){
    //1. deletedfrom - זא שיהיה רק את האפשרות למחוק
    //2. del - שמי שילחצו עליו יצבע למחיקה אך עוד לא ימחק
    const [done, setDone] = useState(false)
    const [del, setDel] = useState(false)
    const [needchangeisselected, setNeedchangeisselected ]= useState([]);
    let temp = [];
    const deleteItemSelected = () =>{
        setDel(!del)
        // temp = [...itemsSelectedNew]
        // temp = temp.filter(x => x.Id != item.id);
        // setItemsSelectedNew(temp)
        //???  למה הוא לא מציג טוב בקונסול בשתי הכופי ולמה צריך סטייט , כי רק בסטייט 
        // מעביר מידע בין קומפוננטות ?
        // ועזרה מתי צריךך העתקה של מערך ?
        // copy = copy.filter(x => x.Id != item.id);
        temp.push(item.productId)
        setNeedchangeisselected((prev) =>{ return  [...prev, item.productId] } );

        setNeedchangeisselected(temp); 
        copy = copy.filter(i=> i.productId != item.productId);

     }
    return(<>
    {/* remember to arrange the classname wont be null... */}
        <img src={item.product.img} className={del?"myimg myimg-del":done?
                                             "myimg pressed-img":"myimg"}
            //  onClick={()=>setDone(!done)} 
             onClick={()=>{colorDelete?deleteItemSelected():setDone(!done)} }
             />
        <p className={done?'pressed-p':null}>{item.product.name}</p>
        {done?<DoneIcon sx={{color:'white', fontSize: 30 }} className='doneIcon'/>:null}
    </>)
}
