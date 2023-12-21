import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OneDestination from "./OneDestination"

export default function LovedAttractions(){
    let mynavigate = useNavigate()
    let lovedattractions = useSelector(state => state.attraction.lovedAttractions)
    return<>
    {console.log("lovedattractions ",lovedattractions)}
<ul>
{lovedattractions.map(item=> <li key={item.id} className='li'><OneDestination attraction={item}/></li>)}
</ul>
    </>
}