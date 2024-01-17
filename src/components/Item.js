import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../StyleComponents/Item.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToMyList } from "../store/actions/item";
import { removeItemFromMyList } from "../store/actions/item";
import { AddAttractionListProductFromServer, DeleteAttractionListProductFromServer } from "../services/item";

export default function Item({ item, all, setCntfrom, cntfrom }) {
  let [arr, setArr] = useState([]);
  let [flag, setFlag] = useState(item.isSelected);
  let copy;
  let dispatch = useDispatch();
  const id = useSelector((s) => s.list.currentAttractionListId);
  const check = () => {
    //??? check it, it change
    setFlag(!flag);

    //אם טרו צריך להוסיפו למערך
    if (flag == false) {
      console.log("צריך להוסיף את הפריט");
      const attlistpro = {
        id: 0,
        productId: item.id,
        attractionListId: id,
        amount: 1,
        status: null,
        product: null,
      };
      AddAttractionListProductFromServer(attlistpro)
        .then((res) => {
          console.log(res.data);
          res.data.product = item;
          //console.log(res.data);
          dispatch(addItemToMyList(res.data)); setCntfrom(cntfrom + 1);
        })
        .catch((err) => "err " + err);
     

    }
    //אם פולס צריך להסירו מהמערך
    else if (flag == true) {
      console.log("צריך להסיר את הפריט");
      DeleteAttractionListProductFromServer(item.id, id)
      .then((res) => {
      dispatch(removeItemFromMyList(item.id));setCntfrom(cntfrom - 1);
      })
      .catch((err) => "err " + err);
    }
  };
  //let tempFlag = false;
  let itemsSelected = useSelector((s) => s.item.itemsSelected);
  let is;
  const isdeleted = () => {
    is = itemsSelected.find((x) => x.id == item.id);
    if (is != null)
      //אם נמצא זא שלא מחקו אותו וצריך להשאר כלחוץ
      return "li-item li-pressed-item";
    //setFlag(false)
    return "li-item";
  };
  return (
    <>
      {console.log(item.isSelected)}
      {console.log(item)}
      <li
        // className={flag?'li-item li-pressed-item':'li-item'}

        // className={flag?isdeleted():'li-item'}
        className={flag ? "li-item li-pressed-item" : "li-item"}
        key={item.id}
        //???הסט לא משנה זה עובד לי הפוך כשפולס...
        //אפשר לגשת לסייט ולעדכנו בו זמנית במשתנים פרימיטיבייםtempFlag=!tempFlag
        onClick={() => check()}
      >
        <Card
          sx={{
            maxWidth: 340,
            textAlign: "center",
            borderRadius: "15px 15px 5px 5px",
          }}
        >
          <CardActionArea>
            <img src={item.img} className="img" alt="" />
            <p className="p">{item.name}</p>
          </CardActionArea>
        </Card>
      </li>
    </>
  );
}
