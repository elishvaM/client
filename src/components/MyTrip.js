import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OneDayInTrip from './OneDayInTrip';
const daysWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"]

export default function MyTrip() {
  const { tripId } = useParams();
  const chosenTripList = useSelector(s => s.list.allTripList.find(x => x.id == tripId));
  //הטיול הנבחר
  const [attractionsDay, setattractionsDay] = useState([])
  //האטרקציות לאותו טיול


  React.useEffect(() => {


    const arr = []
    for (let date = new Date(chosenTripList.travelingDate); date <= new Date(chosenTripList.backingDate); date.setDate(date.getDate() + 1)) {
      console.log(date, attractionsDay,chosenTripList)
      arr.push({
        date: date,
        dayinWeek: daysWeek[date.getDay()],
        trips: chosenTripList.attractionList.filter(x => new Date(x.exitDate).getDate() === date.getDate())
      })
    }
    console.log(arr)
    setattractionsDay(arr);

  }, [chosenTripList])



  return (<>


    <div style={{ display: 'block' }}>
      איפה הבעיה?
      <ul style={{
        listStyleType: 'none', display: 'flex', flexWrap: 'wrap', maxWidth: 1060
        , direction: 'rtl', position: 'absolute', left: '1rem', top: '22rem'
      }}>
        {attractionsDay?.map((attractions, key) => <li key={key}><OneDayInTrip dayinWeek={attractions.dayinWeek} oneDay={attractions.date} attractionsDay={attractions.trips} /></li>
        )}
      </ul>
    </div>
  </>);
}
