import DoneIcon from '@mui/icons-material/Done';
import "../StyleComponents/Item.scss";
export default function Beauty({ item, colorDelete, deleteItemSelected, setDone }) {
    //1. deletedfrom - זא שיהיה רק את האפשרות למחוק
    //2. del - שמי שילחצו עליו יצבע למחיקה אך עוד לא ימחק

    return (<>
    {console.log(item)}
        {/* remember to arrange the classname wont be null... */}
        <img src={item.product.img} className={item.del ? "myimg myimg-del" : item.done ?
            "myimg pressed-img" : "myimg"}
            //  onClick={()=>setDone(!done)} 
            onClick={() => { colorDelete ? deleteItemSelected() : setDone() }}
        />
        <p className={item.done ? 'pressed-p' : null}>{item.product.name}</p>
        {item.done ? <DoneIcon sx={{ color: 'white', fontSize: 30 }} className='doneIcon' /> : null}
    </>)
}
