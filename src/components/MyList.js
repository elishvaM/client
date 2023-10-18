import * as React from 'react';
import "../StyleComponents/Filter.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Checkbox from '@mui/material/Checkbox';
// import Avatar from '@mui/material/Avatar';
import ItemInList from './ItemInList';
import ItemsNavBar from "./ItemsNavBar";
import Plus from "./Plus";

export default function MyList(){
    //////////מיובא
    //???? 
    const [checked, setChecked] = React.useState([1]);

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
    /////////סוף מיובא
    let attractionListProduct = [
        //שלפנו מהדטה בייס את כל המוצרים של האטרקציה הספציפית שנלחצה
        //צריך לשלוף את הכל מחובר באותה שורה ויהיה קל להציג אני מציגה כאילו זה כך
        // {Id:1, TripListId:1, AttractionId:4, ExitDate:"20/01/01", isBasic:}
        {Id:1, ProductId:1, AttractionListId:1,Amount:2, Status:null},//מוצר שלם שמתקשר המשך פרטיו למשתנה product
        {Id:2, ProductId:2, AttractionListId:1,Amount:1, Status:null},
        {Id:3, ProductId:3, AttractionListId:1,Amount:1, Status:null},
        {Id:4, ProductId:4, AttractionListId:1,Amount:1, Status:null}
    ]
    let [product, setProduct] = useState([
      {Id:1, Name:"כובע שמש"  , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Cloth027.JPG" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:2, Name:"משקפי שמש" , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Household 778.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:3, Name:"קרם הגנה"  , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Perfume Bottle.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:4, Name:"מסרק"      , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Hair Brush.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:5, Name:"מצלמה"     , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Household 487.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null}
      
  ])
    const { id } = useParams() ;
    useEffect(() => {
        //ללכת לשלוף את כל הרשימות של זו האטרקציה מהשרת
    //    console.log(this.props.id+"uhugyfgfdgfdssfd")
    }, [])
    let arr = [...product]
    const setAmount = (id, n) =>{
        let copy = [...product]
        let p = copy.find(x => x.Id == id)
        if( p.Amount + n > 0 ) p.Amount += n 
        setProduct(copy)
    }

    const deleteItem = (id) =>{
      let copy = [...product]
      copy = copy.filter(x => x.Id != id)
      setProduct(copy)
   }
   let [flag, setFlag] = useState(false)
    return(<>
    <ItemsNavBar/>
    <ul className="ul">
    {arr.map(item=><li key={item.Id} className="li">
        
    {console.log(item.Id)}
     <ItemInList item={item} setAmount={setAmount} deleteItem={deleteItem}/>
    </li> )}
    </ul>
    <div className='list'>

    </div>
    {/* <input type="text" className={flag?"x":"xx"} onDoubleClick={setFlag(true)}/> */}
    <Plus/>
    </>)

{/* <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
{product.map((value) => {
  const labelId = `checkbox-list-secondary-label-${value.Id}`;
  return (
    <ListItem
      key={value}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(value.Id)}
          checked={checked.indexOf(value.Id) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            alt={`Avatar n°${value + 1}`} // לבדוק מה זה ????
            src={`/imgs/items/${value.Img}`}
          />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={`Line item ${value.Name}`} />
      </ListItemButton>
    </ListItem>
  );
})}
</List> */}

}