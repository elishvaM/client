import { useSelector } from "react-redux"
import OneDestination from "./OneDestination"

export default function LovedAttractions() {
    const lovedattractions = useSelector(state => state.attraction.attractions.filter(x => x.isLoved))
    return <>
        {console.log("lovedattractions ", lovedattractions)}
        <ul>
            {lovedattractions.map(item => <li key={item.id} className='li'><OneDestination attraction={item} /></li>)}
        </ul>
    </>
}