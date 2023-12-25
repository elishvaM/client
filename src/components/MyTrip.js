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
//end popper
// import '../StyleComponents/MyTrip.scss';
export default function MyTrip() {
  const { travelingDate, backingDate } = useParams();
 // const { trip } = this.props.route.params;
  const [isHover, setIsHover] = useState(false);
  const [isHoverOne, setIsHoverOne] = useState(false);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [days, setDays] = useState([]
  //   ["20/2/2023 יום שלישי", "21/2/2023 יום רביעי","22/2/2023 יום חמישי",
  // "23/2/2023 יום שישי","24/2/2023 יום שבת","25/2/2023 יום ראשון",
  // "26/2/2023 יום שני","27/2/2023 יום שלישי"]
  );
  const [daysAtt, setDaysAtt] = useState([[],[],[],[],[],[],[],[]]); //length of days supposed to be
  let arr = [26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7];
  let [children, setChildren] = useState([]);
  let [details, setDetails] = useState();
  let [id, setId] = useState(0);
  let mynavigate = useNavigate();
  function drop(e){
    console.log("dropppp");

    e.preventDefault();
    var fetchData = e.dataTransfer.getData("text");
    let copy = [...daysAtt];
    copy[e.target.className] = [...copy[e.target.className],details]        
    setDaysAtt(copy);
    //צריך להוסיף לדאטה בייס
  // { Id:0, TripListId: ,AttractionId :, ExitDate :, IsBasic :, RemainderDate :, Attraction :, AttractionListProducts :, Likes : , TripList :}
    // e.target.appendChild(document.getElementById(fetchData));
  } 
  function allowDrop(e){
    console.log("agree");

    e.preventDefault();
  }
  const date = [new Date({travelingDate}), new Date(backingDate)]
  let d;
  let temp;
  let day;
  React.useEffect(()=>{
    console.log("day")
    {alert("camee")}
    d = date[0];
    day = d.getDay();
    console.log("day", day)
    day = day == 0 ? "יום ראשון" : day == 1 ? "יום שני" : day == 2 ? "יום שלישי" : day 
          == 3 ? "יום רביעי" : day == 4 ? "יום חמישי" : day == 5 ? "יום שישי" : "יום שבת";
    temp = [moment(d).format('DD/MM/YYYY')+" "+day]
    while(d - date[1] != 0)//like it because the reference object is different
    {
      d.setDate(d.getDate() + 1);
      day = d.getDay();  
      day = day == 0 ? "יום ראשון" : day == 1 ? "יום שני" : day == 2 ? "יום שלישי" : day 
          == 3 ? "יום רביעי" : day == 4 ? "יום חמישי" : day == 5 ? "יום שישי" : "יום שבת";
      temp = [...temp, moment(d).format('DD/MM/YYYY')+" "+day];
      setDays(temp)
    }
    // console.log("lllll",temp)
    // setDays(temp)//רציתי לעשות פעם  אחת פה אחרי הכל למה לא עובד  ???
    // console.log(days)
  },[])//date 
  return (<div style={{display:'block'}}>
    {console.log("tripop")}
    <h1>ברוך ה שהגענו לכאן</h1>
    {console.log("tempgygyg", days)}
    <h1>{temp}</h1>
  <PicNavBar setDetails={setDetails} />
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {/* <DateCalendar /> */}
      {/* <img src="/imgs/product23_image1_2021-03-29_11-25-56.jpg" style={{width:280, height:350}}className='dragData' draggable="true" onDragStart={(e)=>drag(e)}/> */}
         
      {/* <div className="getData"style={{width:2000, height:350, border:'2px solid grey', marginLeft:5, padding:10}}
         onDrop={(e)=>drop(e)}
         onDragOver={(e)=>allowDrop(e)}>
        {children? children:null}
      </div> */}
      <ul style={{listStyleType:'none', display:'flex', flexWrap:'wrap', maxWidth:1060
    , direction:'rtl', position:'absolute', left:'1rem', top:'22rem'}}>
      
      {days.map((i, key)=> <li key={key}
           style={{backgroundColor:'white', minWidth:280, minHeight:350, margin:20,
           borderRadius:15, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display:'block'
           }}>
            <p>{i}</p>
            <img src="/imgs/product23_image1_2021-03-29_11-25-56.jpg"
            style={{borderRadius:'15px 15px 0px 0px', width:280, height:100}}
            />
            {/* {i} */}
            <div style={{ height:200,paddingBottom:5
            // backgroundColor: isHover ? 'lightblue':'rgb(232, 232, 232)'
            // backgroundColor: isHover ? 'rgb(232, 232, 232)':null
            }}
           
            //  onMouseEnter={()=>{setIsHover(true)}}
            //  onMouseLeave={()=>{setIsHover(false)}}  
             onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}className={key}//{+i} 
             >
               {daysAtt[key].length!=0?daysAtt[key].map((i, key2)=>//{console.log(i)}??? למה לא משנה את i.status
               <><div style={{display:'flex'}}
                onMouseEnter={()=>setIsHoverOne(!isHoverOne)} 
                onMouseLeave={()=>setIsHoverOne(!isHoverOne)} onContextMenu={()=>setIsContextMenu(!isContextMenu)}>
               <IconButton sx={{marginX:3, height:40, marginY:'auto'}}
               onClick={()=>{setIsDone(!isDone)
                //console.log(daysAtt[key].Status+ " aa "+i.Status)//???מה הוא לא מרנדר והאם נכון לגשת למערך כשיש לי את זה פה
                daysAtt[key][key2].Status=!daysAtt[key][key2].Status
                //console.log(daysAtt[key].Status+ " bb "+i.Status)
                }}>{/*??? סתם השתמשתי במשתנה כדי שירענן*/}
                  
                  {console.log(daysAtt[key])}         
                {daysAtt[key][key2].Status?<>{console.log(i.Status)}<DoneIcon sx={{borderRadius:15
                  , backgroundColor:'green', color:'white'}}/></>:<>{console.log(i.Status)}<CircleOutlinedIcon/></>}
                </IconButton>  
                <p style={{textDecoration: daysAtt[key][key2].Status ? 'line-through' : 'none', fontSize:17}}>
                 {i.Name} 
                </p> 
               {!isHoverOne?
               <p style={{ position:'relative', right:20// marginRight:60
              }}> 2:30 </p>
              :<div style={{  marginLeft:-6, marginTop:7
              }}>
                 <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/"+i.Id)}/></IconButton></Tooltip>
                 <Tooltip title="הזכר לי"><IconButton><NotificationsIcon/></IconButton></Tooltip>
                 <Tooltip title="מחק"><IconButton><GridDeleteIcon/></IconButton></Tooltip></div> }
                </div><Divider/></>)
               
               
               
               
               
               
              : <>     ריק
               {/* <div style={{display:'flex'
              ,boxShadow:isHoverOne? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)':'none'}} onMouseEnter={()=>setIsHoverOne(!isHoverOne)} 
              onMouseLeave={()=>setIsHoverOne(!isHoverOne)} onContextMenu={()=>setIsContextMenu(!isContextMenu)}>
               <div onClick={()=>setIsDone(!isDone)} style={{margin: "19px 24px 0px 19px"
                        }}>
               {isDone ?
                <DoneIcon sx={{borderRadius:15, backgroundColor:'green', color:'white'}}/>               
                : <CircleOutlinedIcon/>}                
                </div>
                <p style={{textDecoration: isDone ? 'line-through' : 'none', fontSize:17}}>
                 i am</p>  */}
                 
                 
                 {isContextMenu?<></>
          //         <Popper {...bindPopper(popupState)} transition>
          //   {({ TransitionProps }) => (
          //     <Fade {...TransitionProps} timeout={350}>
          //       <Paper>
          //         <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
          //       </Paper>
          //     </Fade>
          //   )}
          // </Popper>
          :null}
        {/* </div> */}
       </>}
               {/*לא לשכוח ? פה צריך לניות אפשרות לכתיבת אטרקציה משלו וגם בלי קשר יותר נוח*/}
          </div> 
 

      </li>)}
      </ul>

    {/* </LocalizationProvider> */}


  </div>);
}
//לוח שנה
// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

// export default function MyTrip() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} >
//       <DemoContainer components={['DateRangeCalendar']} sx={{marginLeft:"18vw"}} >
//         <DateRangeCalendar />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

