import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OneDayInTrip from "./OneDayInTrip";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";

const daysWeek = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "יום שבת",
];

export default function MyTrip() {
  const { tripId } = useParams();
  const data = useSelector((s) => s);
  const chosenTripList = useSelector((s) => s.list.allTripList.find((x) => x.id == tripId));
  const mynavigate = useNavigate();
  console.log("trip d",tripId, chosenTripList, data)
  //הטיול הנבחר
  const [attractionsDay, setattractionsDay] = useState([]);
  //האטרקציות לאותו טיול

  React.useEffect(() => {
    const arr = [];
    for (
      let date = new Date(chosenTripList.travelingDate);
      date <= new Date(chosenTripList.backingDate);
      date.setDate(date.getDate() + 1)
    ) {
      console.log(date, attractionsDay, chosenTripList);
      arr.push({
        date: moment(date).format("YYYY/MM/DD"),
        dayinWeek: daysWeek[date.getDay()],
        trips: chosenTripList.attractionList.filter(
          (x) => new Date(x.exitDate).getDate() === date.getDate()
        ),
      });
    }
    setattractionsDay(arr);
  }, [chosenTripList]);

  return (
    <>
      <div>
      <Button variant="contained" endIcon={<SendIcon />} onClick={()=>mynavigate(`/userlist/${tripId}`)}>
         בואו נארוז
      </Button>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1060,
            direction: "rtl",
          }}
        >
          {attractionsDay?.map((attractions, key) => (
            <li key={key} style={{ padding: 20 }}>
              <OneDayInTrip
                dayinWeek={attractions.dayinWeek}
                date={attractions.date}
                attractionsDay={attractions.trips}
                tripId={tripId}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
