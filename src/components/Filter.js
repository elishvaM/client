import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from "react";
import { useRef } from 'react';
import "../StyleComponents/Filter.scss";
import { updateFiltering } from '../store/actions/attraction';
import { Box } from '@mui/material';
export default function Filter(){
    let dispatch = useDispatch()
    let { handleSubmit } = useForm(); 
    let x = useRef();

    //שליפת כל האטרקציות
    let attractions = useSelector(state=> state.attraction.attractions);
    //שליפת כל אפשרויות הסינון
    let attractionTypes = useSelector(state=> state.attraction.attractionTypes);
    let countries = useSelector(state=> state.attraction.countries);
    let person = useSelector(state=> state.attraction.person);



    let filtered = [...attractions];
    // let [filtered, setFiltered] = useState([...attractions])

    let [arrays, setArrays] = useState([[],[],[]]);
    
    let names = ["attractionTypes","countries","person"]
    let isPressed = [0, 0, 0]


    const xx= (checkbox)=> {
        // let ff = [[],[],[]];
        // let u = [...ff]
        // u[0]=[2]
        // console.log("u", u)
        // u[0] = [2, 3]
        // console.log("u", u)

        if (checkbox.target.checked == false){
            deleteFromFiltering(checkbox)      
        }
        else{
            addToFiltering(checkbox)
        }
        for(let i=0; i<arrays.length; i++){
            if(i == 0)
            attractionTypesF(arrays[i])
            else if(i == 1)
            countriesF(arrays[i]) 
            else if(i == 2)
            personF(arrays[i])
            
        }
        console.log("filtered", filtered)
        dispatch(updateFiltering(filtered))
        filtered = [...attractions];
    }
    let temp = []
    const attractionTypesF=(arr)=>{

        console.log("enterrrr", arr)
        // console.log("filtering-***", filtered)
        if(arr.length == 0)
            {
                console.log("null from type")
                return
            }
        temp = []
        for(let i=0; i<filtered.length; i++){
            for(let j=0; j<arr.length; j++){
                console.log(filtered[i].TypeId == arr[j])
                if(filtered[i].TypeId == arr[j])
                    {
                        temp = [...temp, filtered[i]]
                        break
                    }
            }
        }
        filtered = temp
        console.log("filtereeeeee", filtered)
        // setFiltered(temp)
        // console.log("attractionTypesF", filtered )
    }

    const countriesF=(arr)=>{
        console.log("enterrrr cc", arr)
        console.log("country")
        if(arr.length == 0)
        {
            console.log("null from country")
            return
        }
        temp = [] 
        for(let i=0; i<filtered.length; i++){
            for(let j=0; j<arr.length; j++){
                if(filtered[i].CountryId == arr[j])
                    {
                        temp = [...temp, filtered[i]]
                        break
                    }
            }
        }
        filtered = temp
    }
    const personF=(arr)=>{
        console.log("person")
        if(arr.length == 0)
        {
            console.log("null from person")
            return
        }
        temp = [] 
        for(let i=0; i<filtered.length; i++){
            for(let j=0; j<arr.length; j++){
                if(filtered[i].PersonId == arr[j])
                    {
                        temp = [...temp, filtered[i]]
                        break
                    }
            }
        }
        
        filtered = temp
        
    }
    const addToFiltering = (checkbox)=>{
        let temp = [...arrays[checkbox.target.name], checkbox.target.value]//העתקת המערך הקטן והוספת הערך הנלחץ
        // let arr = [...arrays]
        // arr[checkbox.target.name] = [...temp]
        // console.log("arr", arr)
        // setArrays([...arr])
        arrays[checkbox.target.name] = temp // החלפתי את זה עם 3 שורות קודמות בפועל זה לא אמור להיות טוב חייב לערוך בסט סטייט ??
        console.log("arrays", arrays)
     }
    const deleteFromFiltering = (checkbox)=>{
       let temp = arrays[checkbox.target.name].filter(x => x != checkbox.target.value)
    //    let arr = [...arrays]
    //    arr[checkbox.target.name] = [...temp]
    //    console.log("arr", arr)
    //    setArrays([...arr])
          arrays[checkbox.target.name] = temp
    //    console.log("arrays", arrays)
    }
    // const xx= (checkbox)=> {
    //     console.log(checkbox.target.name)
    //     console.log("*")
    //     if (checkbox.target.checked == false)
    //         {
    //             deleteFromFiltering(checkbox.target.value)
    //             return
    //         }

    //     let temp = [...type, checkbox.target.value]
    //     setType([...temp])
    //     // console.log("temp",temp)

    //     for(let i=0; i<attractions.length; i++){
    //         if (attractions[i].TypeId == checkbox.target.value)
    //         {
    //             filtering = [...filtering, attractions[i]]
    //         }
    //     }
    //     console.log("filtering", filtering)
    //     dispatch(updateFiltering(filtering))

    // }

    return(<>
    
        <form name="myForm2" ref={x} >
            {/* onSubmit={handleSubmit(save)} */}
        <ul>
        <label>סוג אטרקציה</label><br/>
        {/* סוגי אטרקציות */}
        {attractionTypes.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Type} name={0} value={item.Id} onClick={xx}/>
                <label>{item.Type}</label><br/>             
            </li>
        )}
         </ul>
         <ul>
         <label>מדינות</label><br/>
        {/* מדינות */}
        {countries.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Country} name={1} value={item.Id} onClick={xx}/>
                <label>{item.Country}</label><br/>
            </li>
        )}
        </ul>
        <ul>
        <label>גילאים</label><br/>
        {/* גילאים */}
        {person.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Person} name={2} value={item.Id} onClick={xx}/>
                <label>{item.Person}</label><br/>
            </li>
        )}
        </ul>
        <input type="submit" value="Submit" />
        <input type="reset"  value="אפס"></input>
        {/* {x.current.value} */}
       

        </form>
    {/* <FormGroup>
       <ul>
            {arr.map(item=> <li><FormControlLabel control={<Checkbox defaultChecked />} label={item.Type} /></li>)}
      </ul>
    </FormGroup> */}
    </>)
}

