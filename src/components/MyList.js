import React, { useEffect, useState } from 'react';
import "../StyleComponents/Item.scss";
import ItemsNavBar from "./ItemsNavBar";
import { useSelector } from 'react-redux';
import Beauty from "./Beauty";
import ItemsOptions from "./ItemsOptions";
import { saveItems } from '../store/actions/item';
import { useDispatch } from 'react-redux';
import { getAllProducts } from "../services/item";
import { useParams } from 'react-router-dom';
export default function MyList() {
  //////////מיובא
  // const [checked, setChecked] = React.useState([1]);

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
  useEffect(() => {
    //ללכת לשלוף את כל הרשימות של זו האטרקציה מהשרת
    //    console.log(this.props.id+"uhugyfgfdgfdssfd")
    if (listId) {
      //get sepcific list
    }
    else {
      //get empty list
    }
  }, [id, attractionId, listId])
  // let arr = [...product]
  // const setAmount = (id, n) =>{
  //     let copy = [...product]
  //     let p = copy.find(x => x.Id === id)
  //     if( p.Amount + n > 0 ) p.Amount += n 
  //     setProduct(copy)
  // }


  //  let [flag, setFlag] = useState(false);
  let [deleted, setDeleted] = useState(false);
  let itemsSelected = useSelector(s => s.item.itemsSelected);
  let copy = [...itemsSelected];
  let [copy2, setCopy2] = useState([...itemsSelected])

  let dispatch = useDispatch();
  let allitems = useSelector(s => s.item.allitems);//??? מה קורה מאחורי הקלעים אם הלך לשרת ואם לא
  React.useEffect(() => {
    if (allitems.length === 0)
      getAllProducts().then(res => {
        console.log("res", res.data)
        //קריאה לשרת להביא כל המוצרים אם המערך לא ריק 
        //צריך לשנות שזה לא יקרא כל פעם!!! זה צריך להיות כנראה ברדיוסר
        //
        dispatch(saveItems(res.data))
      }
      ).catch(error => { console.log(error) })
  }, [allitems.length, dispatch])
  return (<>
    <ItemsNavBar />
    <div className='list'>
      {/* <ul className="ul">
    {arr.map(item=><li key={item.Id} className="li">
        
    {console.log(item.Id)}
     <ItemInList item={item} setAmount={setAmount} deleteItem={deleteItem}/>
    </li> )}
    </ul> */}
      {/* <OneList2 /> */}
      <ItemsOptions setDeletefrom={setDeleted} copyfrom={copy} copy2from={copy2} />
      {/* <ul className='ul-myitem'>
        {itemsSelected.map((item) =>
          <li className="li-myitem"><Beauty item={item} deletedfrom={deleted} copyfrom={copy} copy2from={copy2} setCopy2from={setCopy2} /></li>//all={flag} 
        )}
      </ul> */}
    </div>
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

}