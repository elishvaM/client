import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import "../StyleComponents/Destination.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OneDestination from "./OneDestination";
import Filter from "./Filter";
import "../StyleComponents/HomePage.scss";
// הסינון
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { attractionFromServer } from "../services/attraction";
import { saveAttractions, saveLovedAttractions, selectAttraction } from "../store/actions/attraction";
import { savedAttractionByUserIdFromServer } from "../services/attraction";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function Destination() {
  // let arr = useSelector(state => state.attraction.filtering);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const mynavigate = useNavigate();
  const arrSelector = useSelector((state) => state.attraction.attractions.filter(x => !pathname.includes("love") || x.isLoved));

  const defaultProps = {
    // val: (option) => option.Id,
    options: arrSelector,
    getOptionLabel: (option) => option.Name,
  };

  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {

    if (!attractions.length) {
      //fatch all the attraction from server
      attractionFromServer()
        .then((res) => {
          //שליחת מערך אטרקציות רגיל ואטרקציות אהובות
          dispatch(saveAttractions(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //כל פעם שהקומפו נקראת היוז אפקט פועל שוב ולא נרצה לשלוף שוב את הכל אלא כבר שמור לנו בסטייט הכללי
    //זה פשוט מיותר -
    //אבל לגבי משתמש לא רשום בשליפה נוספת יתרעננו האטרקציות ולא נראה את מה שאהב
    //??? אם הוא התחבר אבל לא שמר אטרקציות ילך כל פעם לשלוף
    if (user != null) {
      savedAttractionByUserIdFromServer(user.id)
        .then((res) => {
          dispatch(saveLovedAttractions(res.data, true));
        })
        .catch((err) => console.log(err));
    }
    else {
      dispatch(saveLovedAttractions([], false));
    }

  }, [user]);

  const attractions = useSelector((state) => state.attraction.attractions);
  const [displayFilter, setDisplayFilter] = useState(false);
  const m = (x) => {
  };
  return (
    <>
      <div className="attraction-content">
        <div className="attraction-header">
        <div> <h1>אטרקציות,חוויות ופעילויות</h1></div>  
          <h2>בואו לבחור את החוויה הבאה</h2>
        </div>
      </div>
      <Stack spacing={1} sx={{ width: 300 }} onClick={m}>
        <Autocomplete
          {...defaultProps}
          id="חפש"
          disableClearable
          renderInput={(params) => (
            <TextField {...params} label="חפש יעד" variant="standard" />
          )}
        />
      </Stack>
      <Paper
        className="search"
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="  לאן נוסעים ? "
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* הסינון */}
      <BootstrapButton
        variant="contained"
        disableRipple
        sx={{ marginLeft: "63vw" }}
        onClick={() => {
          setDisplayFilter(true);
        }}>
        סינון
      </BootstrapButton>
      {displayFilter === true ? <Filter /> : null}
      {/* הצגת האטרקציות */}
      <ul className="ul-dest">
        {/* למה השורה הבאה שבהערה לא עבדה ??? */}
        {/* {attractions.length!== 0?attractions.map(i => <li key={i.id}><h1>{i.isLoved}</h1></li>):null} */}
        {attractions.length !== 0 ? (
          <div>
            {attractions.map((item) => (
              <li key={item.id} onClick={() =>{dispatch(selectAttraction(item));mynavigate('oneDestinationDetails')}}>
                <OneDestination attraction={item} />
              </li>
            ))}
          </div>
        ) : null}
      </ul>
    </>
  );
}
