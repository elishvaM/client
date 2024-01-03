import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
export default function OneDestinationDetails() {
    const chosenAttraction = useSelector(state => state.attraction.selectedAttraction)
    //דרך הניתוב יותר פשוט לשמור בסטייט  Id  במקום לשלוח
    return (
        <>
            <h1>ברוך ה שהגענו לפה</h1>
            <h1>{chosenAttraction.name}</h1>
            <h1>{chosenAttraction.desc}</h1>
            <img src={`/imgs/att/${chosenAttraction.img}`} alt={chosenAttraction.name} />
            <h1>{chosenAttraction.websiteAddres}</h1>
            <Link to={chosenAttraction.websiteAddres} />

        </>
    )
}