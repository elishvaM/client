import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../StyleComponents/OneDestination.scss";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addLovedAttraction,
} from "../store/actions/attraction";
import {
  AddLovedAttractionFromServer

} from "../services/attraction";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import UpdateDestination from "./UpdateDestination";
import { useNavigate } from "react-router-dom";
import { selectAttraction } from "../store/actions/attraction";
export default function OneDestination({ attraction }) {
  const [editAtt, setEditAtt] = React.useState(false);
  const mydispatch = useDispatch();
  const mynavigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const onLoved = (event) => {
    event.stopPropagation();
    //רק במקרה של מחובר תשמור בשרת
    AddLovedAttractionFromServer({ AttractionId: attraction.id, UserId: user.id })
      .then((res) => {
        mydispatch(addLovedAttraction({ id: attraction.id, isLoved: res.data }));
        //לא משנה מיד בתצוגה
      })
      .catch((error) => console.log("שגיאה בהוספת אטרקציה אהובה", error));
  }
  const openEdit = (event) => {
    event.stopPropagation();
    setEditAtt(!editAtt);
  }
  return (
    <>
      {!editAtt ? (
        <Card
          className="card"
          onClick={(e) => {
            e.stopPropagation();
            mydispatch(selectAttraction(attraction));
            mynavigate("oneDestinationDetails");
          }}
        >
          <CardActionArea>
            <div className="photo-erea">
              <CardMedia
                sx={{ height: 100 }}
                image={`/imgs/att/${attraction.img}`}
                title={attraction.name}
              />
            </div>
            <CardContent className="content">
              <h1>{attraction.name}</h1>
              <h2>{attraction.desc}</h2>
              <h2>{attraction.address.city},{attraction.address.land}</h2>
              <h2>מתאים ל: {attraction.personState.state} </h2>
            </CardContent>
            {/* איך זה שלא צריך לעטף בפונ אנונימית ??? */}
            <Tooltip title="הוסף לאהבתי">
              <IconButton size="large" sx={{ position: "absolute", left: 0 }} >
                <FavoriteIcon color={attraction.isLoved ? "error" : "none"}
                  onClick={onLoved}
                />
              </IconButton>
            </Tooltip>
            {user?.userTypeId === 2 ? (
              <>
                <Tooltip title="ערוך">
                  <IconButton size="medium"
                  // sx={{ position: "absolute", left: 8 }}
                  >
                    <CreateIcon onClick={openEdit} />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </CardActionArea>
        </Card>
      ) : (
        <UpdateDestination
          editAtt={editAtt}
          setEditAtt={setEditAtt}
          attraction={attraction}
        />
      )}
    </>
  );
}
