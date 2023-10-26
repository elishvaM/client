import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OneDestination from "./OneDestination"

export default function LovedAttractions(){
    let mynavigate = useNavigate()
    let lovedattractions = useSelector(state => state.attraction.lovedattractions)
    return<>
<ul>
{lovedattractions.map(item=> <li key={item.Id} className='li'><OneDestination x={item} type="create"/></li>)}
</ul>
    </>
}