import moment from 'moment';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import { Divider } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import IconButton from '@mui/material/IconButton';
import PicNavBar from './PicNavBar';
import { grey } from '@mui/material/colors';
import { GridDeleteIcon } from '@mui/x-data-grid';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CreateIcon from '@mui/icons-material/Create';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// start popper
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import OneDayInTrip from './OneDayInTrip';
export default function MyTrip() {
  const { tripId } = useParams();
  const [isHover, setIsHover] = useState(false);
  const [isHoverOne, setIsHoverOne] = useState(false);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [days, setDays] = useState([]);
  const allTripList = useSelector(s => s.list.allTripList);
  const [daysAtt, setDaysAtt] = useState([[], [], [], [], [], [], [], []]); //length of days supposed to be
  let arr = [26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7];
  let [details, setDetails] = useState();
  let mynavigate = useNavigate();
  function drop(e) {
    e.preventDefault();
    var fetchData = e.dataTransfer.getData("text");
    let copy = [...daysAtt];
    copy[e.target.className] = [...copy[e.target.className], details]
    setDaysAtt(copy);
  }
  function allowDrop(e) {
    console.log("agree");
    e.preventDefault();
  }
  let chosenTripList = null;
  let date;
  let d;
  let temp;
  let day;
  React.useEffect(() => {
    chosenTripList = allTripList.find(x => x.id == tripId);
    date = [new Date(chosenTripList.travelingDate), new Date(chosenTripList.backingDate)];
    console.log("choosen trip", chosenTripList)
    d = date[0];
    day = d.getDay();
    day = day == 0 ? "יום ראשון" : day == 1 ? "יום שני" : day == 2 ? "יום שלישי" : day
      == 3 ? "יום רביעי" : day == 4 ? "יום חמישי" : day == 5 ? "יום שישי" : "יום שבת";
    temp = [moment(d).format('DD/MM/YYYY') + " " + day]
    console.log(temp)
    while (d - date[1] != 0)//like it because the reference object is different
    {
      console.log("hhhhhhhhh")
      d.setDate(d.getDate() + 1);
      day = d.getDay();
      day = day == 0 ? "יום ראשון" : day == 1 ? "יום שני" : day == 2 ? "יום שלישי" : day
        == 3 ? "יום רביעי" : day == 4 ? "יום חמישי" : day == 5 ? "יום שישי" : "יום שבת";
      temp = [...temp, moment(d).format('DD/MM/YYYY') + " " + day];
      setDays(temp)
    }
    setDays(temp)//רציתי לעשות פעם  אחת פה אחרי הכל למה לא עובד  ???
  }, [])

  return (<div style={{ display: 'block' }}>
    <h1>{temp}</h1>
    <ul style={{
      listStyleType: 'none', display: 'flex', flexWrap: 'wrap', maxWidth: 1060
      , direction: 'rtl', position: 'absolute', left: '1rem', top: '22rem'
    }}>

      {days.map((i, key) =>
        <li key={key}><OneDayInTrip oneDay={i} /></li>
        // <li key={key}
        //   style={{
        //     backgroundColor: 'white', minWidth: 280, minHeight: 350, margin: 20,
        //     borderRadius: 15, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'block'
        //   }}>
        //   <p>{i}</p>
        //   <img src="/imgs/product23_image1_2021-03-29_11-25-56.jpg"
        //     style={{ borderRadius: '15px 15px 0px 0px', width: 280, height: 100 }}
        //   />
        //   {/* {i} */}
        //   <div style={{
        //     height: 200, paddingBottom: 5
        //   }}
        //     onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={key}//{+i} 
        //   >
        //     {daysAtt[key].length != 0 ? daysAtt[key].map((i, key2) =>//{console.log(i)}??? למה לא משנה את i.status
        //       <><div style={{ display: 'flex' }}
        //         onMouseEnter={() => setIsHoverOne(!isHoverOne)}
        //         onMouseLeave={() => setIsHoverOne(!isHoverOne)} onContextMenu={() => setIsContextMenu(!isContextMenu)}>
        //         <IconButton sx={{ marginX: 3, height: 40, marginY: 'auto' }}
        //           onClick={() => {
        //             setIsDone(!isDone)
        //             //console.log(daysAtt[key].Status+ " aa "+i.Status)//???מה הוא לא מרנדר והאם נכון לגשת למערך כשיש לי את זה פה
        //             daysAtt[key][key2].Status = !daysAtt[key][key2].Status
        //             //console.log(daysAtt[key].Status+ " bb "+i.Status)
        //           }}>{/*??? סתם השתמשתי במשתנה כדי שירענן*/}

        //           {console.log(daysAtt[key])}
        //           {daysAtt[key][key2].Status ? <>{console.log(i.Status)}<DoneIcon sx={{
        //             borderRadius: 15
        //             , backgroundColor: 'green', color: 'white'
        //           }} /></> : <>{console.log(i.Status)}<CircleOutlinedIcon /></>}
        //         </IconButton>
        //         <p style={{ textDecoration: daysAtt[key][key2].Status ? 'line-through' : 'none', fontSize: 17 }}>
        //           {i.Name}
        //         </p>
        //         {!isHoverOne ?
        //           <p style={{
        //             position: 'relative', right: 20// marginRight:60
        //           }}> 2:30 </p>
        //           : <div style={{
        //             marginLeft: -6, marginTop: 7
        //           }}>
        //             <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/" + i.Id)} /></IconButton></Tooltip>
        //             <Tooltip title="הזכר לי"><IconButton><NotificationsIcon /></IconButton></Tooltip>
        //             <Tooltip title="מחק"><IconButton><GridDeleteIcon /></IconButton></Tooltip></div>}
        //       </div><Divider /></>)
        //       : <>     ריק        
        //       </>}
        //   </div>
        // </li>
      )}
    </ul>
  </div>

  );
}
