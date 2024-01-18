import React, { useEffect, useState } from 'react';
import "../StyleComponents/Item.scss";
import ItemsNavBar from "./ItemsNavBar";
import { useSelector } from 'react-redux';
import Beauty from "./Beauty";
import ItemsOptions from "./ItemsOptions";
import { saveItems, saveItemsSelected, saveProductTypes } from '../store/actions/item';
import { useDispatch } from 'react-redux';
import { getAllProducts, GetAttractionListProductByAttractionListId, getAllProductTypes } from "../services/item";
import { useParams } from 'react-router-dom';
import UserAttractionList from "./UserAttractionList";
import EditedLists from './EditedLists';
export default function MyList() {
  //////////מיובא

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
  const [itemsSelectedNew, setItemsSelectedNew] = useState(itemsSelected)
  let [colorDelete, setColorDelete] = useState(false);//לאפשר לצבוע פריטים למחיקה אך עוד לא למחוק
  React.useEffect(() => {
     // if (allitems.length == 0) {
      getAllProducts().then(res => {
        //קריאה לשרת להביא כל המוצרים אם המערך לא ריק 
        //צריך לשנות שזה לא יקרא כל פעם!!! זה צריך להיות כנראה ברדיוסר
        dispatch(saveItems(res.data))
      }
      ).catch(error => { console.log(error) })
      getAllProductTypes().then(res => {
        dispatch(saveProductTypes(res.data))
      }).catch(error => { console.log(error) })
   // }
  }, [])//allitems.length, dispatch//??? מה זה והאם הוא עושה לפי הסדר כיוון שקודם צריך לשמור פריטים שנבחרו
  //??? יותר מידי קריאות שרת

  const deleteItemSelected = (item, key) => {
    const copy = [...itemsSelectedNew];
    const index = copy.findIndex(x => x.Id == item.Id)
    if (index >= 1) {
      copy[index][key] = !copy[index][key]
      copy[index].isChange = true;
      setItemsSelectedNew(copy)
    }
  }
  return (<>
  
    <ItemsNavBar/>
      <ItemsOptions setColorDelete={setColorDelete} itemsSelectedNew={itemsSelectedNew} />
        <UserAttractionList/>
    {/* //  <Plus/>  */}
  </>)
}
 