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
import OneDestination from "./OneDestination";
import Filter from "./Filter";
import "../StyleComponents/HomePage.scss";
import { saveAttractions, saveLovedAttractions, selectAttraction, } from "../store/actions/attraction";
// הסינון
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { attractionFromServer, savedAttractionByUserIdFromServer } from "../services/attraction";
import { attractionTypeFromServer } from '../services/attractionType';
import { personStateFromServer } from "../services/personState";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { set } from "react-hook-form";
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
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const attractions = useSelector((state) => state.attraction.attractions.filter(x => !pathname.includes("love") || x.isLoved));
  const user = useSelector((state) => state.user.currentUser);
  const [show, setShow] = React.useState(false);
  const defaultProps = {
    options: attractions,
    getOptionLabel: (option) => option.address.land,
  };
  //filter
  const [personState, setPersonState] = React.useState();
  const [attractionType, setAttractionType] = React.useState();
  const [selectType, setSelectType] = React.useState([]);
  const [selectSatte, setSelectState] = React.useState([]);

  const [myLoaction, setLocation] = React.useState("");
  useEffect(() => {
    personStateFromServer().then(res => {
      setPersonState(res.data)
    }).catch(err => console.log(err))
    attractionTypeFromServer().then(res => {
      setAttractionType(res.data)
    }).catch(err => console.log(err))
    if (!attractions.length) {
      //fatch all the attraction from server
      attractionFromServer()
        .then((res) => {
          dispatch(saveAttractions(res.data))
          if (user) {
            savedAttractionByUserIdFromServer(user.id)
              .then((res) => {
                dispatch(saveLovedAttractions(true, res.data))
              }).catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (user != null) {
      savedAttractionByUserIdFromServer(user.id)
        .then((res) => {
          dispatch(saveLovedAttractions(true, res.data))
        }).catch((err) => console.log(err));
    }
    else {
      dispatch(saveLovedAttractions(false, []));
    }
  }, [user]);
  const m = (x) => {
  };
  const selectLocation = (e) => {
    setLocation(e.target.value)
  }
  const selectUser = (e, choose) => {
    const copy = [...selectType]
    //הוא מסומן
    if (e.target.checked) {
      copy.push(choose)
      setSelectType(copy)
    }
    //הוא הוריד סימון
    else {
      const remove = copy.filter(x => x != choose)
      setSelectType(remove)
    }
  }
  const selectUserState = (e, choose) => {
    const copy = [...selectSatte]
    //הוא מסומן
    if (e.target.checked) {
      copy.push(choose)
      setSelectState(copy)
    }
    //הוא הוריד סימון
    else {
      const remove = copy.filter(x => x != choose)
      setSelectState(remove)
    }
  }
  return (
    <>
      <div className="attraction-content">
        <div className="attraction-header">
          <div> <h1>אטרקציות,חוויות ופעילויות</h1></div>
          <h2>בואו לבחור את החוויה הבאה</h2>
        </div>
        {/* הצגת אטרקציות ויעדים נבחרים דיב עם שאלות נפוצות באקורדיון ועוד דיב עם קצת מלל */}
      </div>
      {/* <Stack sx={{ maxWidth: 230 }}>
        <Autocomplete
          {...defaultProps}
          id="חפש"
          disableClearable
          renderInput={(params) => (<>
            <TextField {...params} label="חפש יעד" variant="standard" />
            <IconButton type="button" onClick={() => { setShow(true) }} sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </>)}
        />
      </Stack> */}
      <Paper
        className="search"
        component="form"
        sx={{
          p: "2px 4px",
          direction: "rtl",
          display: "flex",
          alignItems: "center",
          width: 250,
        }}>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="כאן ניתן להקליד ארץ או עיר רצויה"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={selectLocation}
        />
        <IconButton type="button" onClick={() => { setShow(true) }} sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {show ? <>
        <div className='asinun'>
          {/* הסינון */}
          <h3>סוג האטרקציה</h3>
          <FormGroup>
            {attractionType?.map(x => <FormControlLabel onClick={(e) => selectUser(e, x.type)} control={<Checkbox />} label={x.type} />)}
          </FormGroup>
          <h3>קהל יעד</h3>
          <FormGroup>
            {personState?.map(x => <FormControlLabel onClick={(e) => selectUserState(e, x.state)} control={<Checkbox />} label={x.state} />)}
          </FormGroup>
        </div>
        <ul className="ul-dest">
          {attractions.length !== 0 ? (
            <div>
              {attractions
                .filter(x =>
                ((!myLoaction || x.address.land == myLoaction) &&
                  (!selectType.length || selectType?.includes(x.type)) &&
                  (!selectSatte.length || selectSatte?.includes(x.state))
                ))
                ?.map((item) => (
                  <li key={item.id}                 >
                    <OneDestination attraction={item} />
                  </li>
                ))}
            </div>
          ) : null}
        </ul>
      </> : null}
    </>
  );
}
