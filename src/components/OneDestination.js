import * as React from "react";
import Card from "@mui/material/Card";
//import Typography from '@mui/material/Typography';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../StyleComponents/OneDestination.scss";
// import CardActions from '@mui/material/CardActions';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import OneAttraction from './OneAttraction';
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addLovedAttraction,
  removeLovedAttraction,
} from "../store/actions/attraction";
import { useNavigate } from "react-router-dom";
import {
  AddLovedAttractionFromServer,
  RemoveLovedAttractionFromServer,
} from "../services/attraction";

export default function OneDestination({ attraction }) {
  let mydispatch = useDispatch();
  let mynavigate = useNavigate();
  let user = useSelector((state) => state.user.currentUser);
  let lovedAttraction;
  const onClick = () => {
    lovedAttraction = { UserId: user?.id, AttractionId: attraction.id };

    if (!attraction.isLoved) {
      if (user != null) {
        //רק במקרה של מחובר תשמור בשרת
        AddLovedAttractionFromServer(lovedAttraction)
          .then((res) => {
            console.log("res loved ", res.data);
          })
          .catch((error) => console.log("שגיאה בהוספת אטרקציה אהובה", error));
      }
      //ובכל מקרה תשמור בתצוגה
      mydispatch(addLovedAttraction(attraction));
    } else {
      if(user != null){
      RemoveLovedAttractionFromServer(lovedAttraction)
        .then((res) => {
          console.log("res not loved ", res.data);
        })
        .catch((error) => console.log("שגיאה במחיקת אטרקציה אהובה", error));
    }
    mydispatch(removeLovedAttraction(attraction.id));
  }
  };
  return (
    <>
     {console.log("!!!",attraction.img)}
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
            {/* <Typography  color="text.primary"> */}
            <h2>{attraction?.desc}</h2>
            {/* </Typography> */}
          </CardContent>
          <IconButton aria-label="add to favorites" onClick={() => onClick()}>
            <FavoriteIcon color={attraction.isLoved ? "error" : "none"} />
          </IconButton>
        </CardActionArea>
      </Card>
    </>
  );
}
