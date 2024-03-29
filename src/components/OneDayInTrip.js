import * as React from "react";
import { useSelector } from "react-redux";
import { Autocomplete, Collapse, Stack } from "@mui/material";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import Tooltip from "@mui/material/Tooltip";
import { saveCurrentAttractionListId } from "../store/actions/list";
import { AttractionLists } from "./AttractionLists";
import { AddAttractionListFromServer } from "../services/list";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function OneDayInTrip({ date, attractionsDay, dayinWeek ,tripId}) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [choosenAttraction, setChoosenAttraction] = React.useState([]);
  const navigate = useNavigate(); 
  //הצגת תאריך ככותרת
  React.useEffect(() => {
   console.log(attractionsDay)
   const a = attractionsDay.map(i=>
      ({attractionListId:i.id,
       attractionId:i.attractionId,name:i.attraction.name})) ;
    setChoosenAttraction(a);
  }, []);
  const lovedattractions = useSelector((state) =>
    state.attraction.attractions.filter((x) => x.isLoved)
  );
  // lovedattractions.map(x => { x.label = x.name });
  const addattractionsList = (attraction) => {
    const attractionList = {TripListId:Number(tripId),AttractionId:attraction.id,ExitDate:new Date(date),IsBasic:false,RemainderDate:new Date(),Status:true};
   console.log("aaa",attractionList)
    AddAttractionListFromServer(attractionList).then(res=>{
      const copy = [...choosenAttraction];
      const b = {attractionListId:res.data.id,attractionId:attraction.id,name:attraction.name}
      copy.push(b);
      setChoosenAttraction(copy)
    }).catch(err=>console.log("err"+err));

  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              1
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={dayinWeek + " " + date}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image="/imgs/product23_image1_2021-03-29_11-25-56.jpg"
          alt="Paella dish"
        />
        <CardMedia>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={lovedattractions}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            onChange={(event, newValue) => addattractionsList(newValue)}
            renderInput={(params) => <TextField {...params} label="אטרקציה" />}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            אטרקציות
            {choosenAttraction?.length === 0 ? (
              <span>הוסף אטרקציות ליום זה</span>
            ) : (
              <AttractionLists attractionsDay={choosenAttraction} />

              // choosenAttraction?.map((x) => (
              //   <>
              //     {x.name}
              //   </>
              // ))
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="שתף">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>אטרקציות:</Typography>
            <Typography paragraph></Typography>
          </CardContent>
        </Collapse>
        {/* {attractionsDay?.map(attractionList => <><h5>{attractionList.attractionId}</h5>
      <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() =>
        {dispatch(saveCurrentAttractionListId(attractionList.id));
          navigate(`/mypage/editedlists/${attractionList.attractionId}` )
            //navigate(`/mylist/${attractionList.id}/${attractionList.attractionId}`)  

          }}/></IconButton></Tooltip>

      </>)} */}
      </Card>
    </>
  );
}
