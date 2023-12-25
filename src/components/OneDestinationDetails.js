import { Link } from "react-router-dom"
export default function OneDestinationDetails(attraction) {
  
    return (
        <>
        <h1>ברוך ה שהגענו לפה</h1>
            <h1>{attraction.name}</h1>
            <h1>{attraction.desc}</h1>
            <img src={`/imgs/att/${attraction.img}`} />
            <h1>{attraction.websiteAddres}</h1>
            <Link to={attraction.websiteAddres}/>

        </>
    )
}