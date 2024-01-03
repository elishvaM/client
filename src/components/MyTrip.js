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
  const allTripList = useSelector(s => s.list.allTripList);
  //הטיול הנבחר
  const chosenTripList = allTripList.find(x => x.id == tripId);
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
  //האטרקציות לאותו טיול
  const attractions = chosenTripList.attractionList;
  const sortttractions = [];
  let sorted = chosenTripList.attractionList?.sort((a, b) => a.exitDate - b.exitDate);
  //  new Date(...a.exitDate.split('/').reverse())
  //  - new Date(...b.exitDate.split('/').reverse()));
  let date;
  let d;
  let [days, setDays] = useState([]);
  let copy;
  React.useEffect(() => {
    date = [new Date(chosenTripList.travelingDate), new Date(chosenTripList.backingDate)];
    //יציאה לטיול
    d = date[0];
    //טמפ מאותחל כך כדי שבפעם הראשונה של הלולאה הוא יעבור ליום הבא ולא ידלג על יום ראשון
    copy = [moment(d).format('DD/MM/YYYY')];
    console.log("copy", copy)
    // setDays(copy);
    //דחיפת כל ימי הטיול לטמפ
    while (d - date[1] != 0)//like it because the reference object is different
    {
      d.setDate(d.getDate() + 1);
      copy = [...copy, moment(d).format('DD/MM/YYYY')];
      setDays(copy);
    }
    setDays(copy)
   
  }, [])
let attractionsDay;
const findAttractionsDay=(i)=>{
  console.log("day0",days[0])
  console.log("exit",attractions[0].exitDate)
  console.log("exit",moment(attractions[0].exitDate).format('DD/MM/YYYY'))
  attractionsDay =  attractions.map(x=> console.log(x.exitDate ===  moment(i).format('DD/MM/YYYY')))

  attractionsDay = attractions.filter(x => x.exitDate ===  moment(i).format('DD/MM/YYYY'))
}
  return (<>
    {console.log("c2", days)}
    <div style={{ display: 'block' }}>
      איפה הבעיה?
      <ul style={{
        listStyleType: 'none', display: 'flex', flexWrap: 'wrap', maxWidth: 1060
        , direction: 'rtl', position: 'absolute', left: '1rem', top: '22rem'
      }}>
        {days?.map((i, key) =>
          { findAttractionsDay(i);
          <li key={key}><OneDayInTrip oneDay={i} attractionsDay={attractionsDay}/></li>
          }
        )}
      </ul>
    </div>
  </>);
}
