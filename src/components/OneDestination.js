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
  removeLovedAttraction,
} from "../store/actions/attraction";
import {
  AddLovedAttractionFromServer,
  RemoveLovedAttractionFromServer,
} from "../services/attraction";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import UpdateDestination from "./UpdateDestination";
import { useNavigate } from "react-router-dom";
import { selectAttraction } from "../store/actions/attraction";
export default function OneDestination({ attraction }) {
  let [editAtt, setEditAtt] = React.useState(false);
  let mydispatch = useDispatch();
  const mynavigate = useNavigate();
  let user = useSelector((state) => state.user.currentUser);
  let lovedAttraction;
  return (
    <>
      {console.log("!!!", attraction.img)}
      {!editAtt ? (
        <Card
          className="card"
          onClick={() => {
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
              {console.log(attraction)}
              <h1>{attraction?.name}</h1>
              <h2>{attraction?.desc}</h2>
              <h3>{attraction.type + " מתאים ל" + attraction.state}</h3>
              {/* </Typography> */}
            </CardContent>
            {/* איך זה שלא צריך לעטף בפונ אנונימית ??? */}
            <IconButton aria-label="add to favorites" >
              <FavoriteIcon color={attraction.isLoved ? "error" : "none"} />
            </IconButton>
            {user?.userTypeId == 2 ? (
              <>
                <Tooltip title="ערוך">
                  <IconButton
                    sx={{ position: "absolute", left: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAtt(!editAtt);
                    }}
                  >
                    <CreateIcon />
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
