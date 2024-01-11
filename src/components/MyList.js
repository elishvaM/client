import React, { useEffect, useState } from 'react';
import "../StyleComponents/Item.scss";
import ItemsNavBar from "./ItemsNavBar";
import { useSelector } from 'react-redux';
import Beauty from "./Beauty";
import ItemsOptions from "./ItemsOptions";
import { saveItems, saveItemsSelected, saveProductTypes } from '../store/actions/item';
import { useDispatch } from 'react-redux';
import { getAllProducts, GetAttractionListProductByAttractionListId,getAllProductTypes } from "../services/item";
import { useParams } from 'react-router-dom';
import EditedLists from './EditedLists';
export default function MyList() {
  //////////מיובא
  const [checked, setChecked] = React.useState([1]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  /////////סוף מיובא


  const { id, attractionId, listId } = useParams();
  
  // useEffect(() => {
  //   getAllProducts().then(res=>dispatch(saveItems(res.data))).catch(err=>console.log("err", err))
  //   //ללכת לשלוף את כל הרשימות של זו האטרקציה מהשרת

  //   if (listId) {
  //     //get sepcific list
  //   }
  //   else {
  //     //get empty list
  //   }
  // }, [id, attractionId, listId])

  const itemsSelected = useSelector(s => s.item.itemsSelected);
  const allitems = useSelector(s => s.item.allitems);//??? מה קורה מאחורי הקלעים אם הלך לשרת ואם לא
  const dispatch = useDispatch();
  let copy = [...itemsSelected];
  const [itemsSelectedNew, setItemsSelectedNew] = useState(copy)
  let [colorDelete, setColorDelete] = useState(false);//לאפשר לצבוע פריטים למחיקה אך עוד לא למחוק
  React.useEffect(() => {
    if (allitems.length === 0){
    GetAttractionListProductByAttractionListId(id).then(res=>{
      console.log("fuul product to my attraction list")
      console.log(res.data)
      dispatch(saveItemsSelected(res.data))
    }).catch(error => { console.log(error) })
      getAllProducts().then(res => {
        //קריאה לשרת להביא כל המוצרים אם המערך לא ריק 
        //צריך לשנות שזה לא יקרא כל פעם!!! זה צריך להיות כנראה ברדיוסר
        //
        dispatch(saveItems(res.data))
      }
      ).catch(error => { console.log(error) })
      getAllProductTypes().then(res => {
        dispatch(saveProductTypes(res.data))
      }).catch(error => { console.log(error) })
    }
  }, [])//allitems.length, dispatch//??? מה זה והאם הוא עושה לפי הסדר כיוון שקודם צריך לשמור פריטים שנבחרו
  //??? יותר מידי קריאות שרת
  return (<>
    <ItemsNavBar />
    <div className='list'>
      <ItemsOptions setColorDelete={setColorDelete} itemsSelectedNew={itemsSelectedNew} />
      <ul className='ul-myitem'>
        {itemsSelected.map((item) =>
          <li className="li-myitem"><Beauty item={item} colorDelete={colorDelete} copy={copy} itemsSelectedNew={itemsSelectedNew} setItemsSelectedNew={setItemsSelectedNew} /></li>//all={flag} 
        )}
      </ul>
    </div>

    <EditedLists attractionId={attractionId}/>
    {/* // <input type="text" className={flag?"x":"xx"} onDoubleClick={setFlag(true)}/> */}
    {/* //  <Plus/>  */}
  </>)

  //  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  // {product.map((value) => {
  //   const labelId = `checkbox-list-secondary-label-${value.Id}`;
  //   return (
  //     <ListItem
  //       key={value}
  //       secondaryAction={
  //         <Checkbox
  //           edge="end"
  //           onChange={handleToggle(value.Id)}
  //           checked={checked.indexOf(value.Id) !== -1}
  //           inputProps={{ 'aria-labelledby': labelId }}
  //         />
  //       }
  //       disablePadding
  //     >
  //       <ListItemButton>
  //         <ListItemAvatar>
  //           <Avatar
  //             alt={`Avatar n°${value + 1}`} // לבדוק מה זה ????
  //             src={`/imgs/items/${value.Img}`}
  //           />
  //         </ListItemAvatar>
  //         <ListItemText id={labelId} primary={`Line item ${value.Name}`} />
  //       </ListItemButton>
  //     </ListItem>
  //   );
  // })}
  // </List> 


     // <ItemInList item={item} setAmount={setAmount} deleteItem={deleteItem}/>
      // {/<OneList2 /> 
        }