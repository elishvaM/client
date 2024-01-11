import { useParams, useLocation } from "react-router-dom"
export default function EditedList(){
    const { state } = useLocation();
    return (<>
    {state.attractionListProduct.map(i=><img src={i.product.img} style={{height:100, width:100}}/>)}
    </>)
}