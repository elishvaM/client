import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../StyleComponents/OneDestination.scss";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addLovedAttraction, removeLovedAttraction, } from "../store/actions/attraction";
import { AddLovedAttractionFromServer, RemoveLovedAttractionFromServer, } from "../services/attraction";
export default function OneDestination({ attraction }) {
  let mydispatch = useDispatch();
  let user = useSelector((state) => state.user.currentUser);
  let copy = [attraction]
  // const onClick = (event) => {
  //   event.stopPropagation();
  //   lovedAttraction = { UserId: user?.id, AttractionId: attraction.id };
  //   if (!attraction.isLoved) {
  //     if (user != null) {
  //       //רק במקרה של מחובר תשמור בשרת
  //       AddLovedAttractionFromServer(lovedAttraction)
  //         .then((res) => {
  //           // copy.isLoved = true;
  //           // console.log("att", attraction)

  //           console.log("res loved ", res.data);
  //         })
  //         .catch((error) => console.log("שגיאה בהוספת אטרקציה אהובה", error));
  //     }
  //     mydispatch(addLovedAttraction(attraction));
  //   } else {
  //     if (user != null) {
  //       RemoveLovedAttractionFromServer(lovedAttraction)
  //         .then((res) => {
  //           copy.isLoved = false;
  //           // console.log("att", attraction)
  //           // console.log("c", copy)
  //           console.log("res not loved ", res.data);
  //         })
  //         .catch((error) => console.log("שגיאה במחיקת אטרקציה אהובה", error));
  //     }
  //     mydispatch(removeLovedAttraction(attraction.id));
  //   }
  // };
  return (
    <>
      <Card className="card">
        <CardActionArea>
          <div className="photo-erea">
            <CardMedia
              sx={{ height: 100 }}
              image={`/imgs/att/${attraction.img}`}
              title={attraction.name} />
          </div>
          <CardContent className="content">
            <h1>{attraction?.name}</h1>
            <h2>{attraction?.desc}</h2>
          </CardContent>
          <IconButton aria-label="add to favorites" >
            <FavoriteIcon color={attraction.isLoved ? "error" : "none"} />
          </IconButton>
        </CardActionArea>
      </Card>
    </>
  );
}
