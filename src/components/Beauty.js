import { green } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import "../StyleComponents/Item.scss";
export default function Beauty({item, deletedfrom, copyfrom, copy2from, setCopy2from}){
    //1. deletedfrom - זא שיהיה רק את האפשרות למחוק
    //2. del - שמי שילחצו עליו יצבע למחיקה אך עוד לא ימחק
    let [done, setDone] = useState(false)
    let [del, setDel] = useState(false)
    let temp;
    let xxx;
    // let itemsSelected = useSelector(s => s.item.itemsSelected);
    const deleteItemSelected = () =>{
        setDel(!del)
        console.log(item.Id)
        temp = [...copy2from]
        console.log("temp", temp)
        temp = temp.filter(x => x.Id != item.Id);
        console.log("temp filter after", temp)
        setCopy2from(temp)
         console.log("copy2", copy2from)
        //???  למה הוא לא מציג טוב בקונסול בשתי הכופי ולמה צריך סטייט , כי רק בסטייט 
        // מעביר מידע בין קומפוננטות ?
        // ועזרה מתי צריךך העתקה של מערך ?
        copyfrom = copyfrom.filter(x => x.Id != item.Id);
        // xxx = [...copyfrom];
        // alert(copyfrom.length)
        console.log("copy", copyfrom)
      
        // setProduct(copy)
     }
    return(<>
    {/* {alert(isDelfrom)} */}
    {/* remember to arrange the classname wont be null... */}
        <img src={item.Img} className={del?"myimg myimg-del":done?
                                             "myimg pressed-img":"myimg"}
            //  onClick={()=>setDone(!done)} 
             onClick={()=>{deletedfrom?deleteItemSelected():setDone(!done)} }
             />
        <p className={done?'pressed-p':null}>{item.Name}</p>
        {done?<DoneIcon sx={{color:'white', fontSize: 30 }} className='doneIcon'/>:null}
    </>)
}
