import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from "react";
import { useRef } from 'react';
import "../StyleComponents/Destination.scss";
import { changeSwitch, updateFiltering } from '../store/actions/attraction';
import { Box } from '@mui/material';
//סלקט התחלה
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
//סלקט סוף
//start slider
  function valuetext(value) {
    return `${value}°C`;
  }
//end slider
export default function Filter(){
  //start slider
  const [value, setValue] = React.useState([0, 1000]);//? לשנות למקס פרייס

  const handleChange = (event, newValue) => {
    setValue(newValue);
    xx(1);
  };
  //end slider
    let dispatch = useDispatch()
    let { handleSubmit } = useForm(); 
    let x = useRef();

    //שליפת כל האטרקציות
    let attractions = useSelector(state=> state.attraction.attractions);
    //שליפת כל אפשרויות הסינון
    let attractionTypes = [  {id:1, type:"יבש"},{id:2, type:"רטוב"},{id:3, type:"אקסטרים"},];
    let countries = []; 
    let person = [{id:1, person:"ילדים"},{id:2, person:"נוער"},{id:4, person:"מבוגרים"}];// {Id:3, Person:"הכל"},//];
    
      
  
    let filtered = [...attractions];
    let [arrays, setArrays] = useState([[],[],[]]);
    let [first, setFirst] = useState(true);
    const xx= (checkbox)=> {
        if (first) {dispatch(changeSwitch()); setFirst(false)}//? למה צריך לשים בסטייט
        if(checkbox != 1){
        if (checkbox.target.checked == false){
            deleteFromFiltering(checkbox)      
        }
        else{
            addToFiltering(checkbox)
        }}
        priceF();
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
        console.log("person be l "+filtered.length)
        for(let i=0; i<filtered.length; i++){
            for(let j=0; j<arr.length; j++){
                console.log(filtered[i].typeId == arr[j])
                if(filtered[i].typeId == arr[j])
                    {
                        temp = [...temp, filtered[i]]
                        break
                    }
            }
        }
        
        filtered = temp
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
                if(filtered[i].countryId == arr[j])
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
                if(filtered[i].personId == arr[j])
                    {
                        temp = [...temp, filtered[i]]
                        break
                    }
            }
        }
        
        filtered = temp
        console.log("person af", filtered)
    }
    const priceF=()=>{
      // if(arr.length == 0)
      // {
      //     console.log("null from price")
      //     return
      // }
      //? אפשר  לשנו תהערה ולעשות פה שאם זה עומד מהמחיר המינימלי עד המקסימלי שיצא
      temp = [] 
      console.log("temp ", temp);
      for(let i=0; i<filtered.length; i++)  
         if(filtered[i].price >= value[0] && filtered[i].price <= value[1])
            temp = [...temp, filtered[i]];
      
      console.log("filteredddddd be",filtered);
      filtered = temp
      console.log("filteredddddd af",filtered);
      
  }
    const addToFiltering = (checkbox)=>{
        let temp = [...arrays[checkbox.target.name], checkbox.target.value]//העתקת המערך הקטן והוספת הערך הנלחץ
        arrays[checkbox.target.name] = temp // החלפתי את זה עם 3 שורות קודמות בפועל זה לא אמור להיות טוב חייב לערוך בסט סטייט ??
     }
    const deleteFromFiltering = (checkbox)=>{
       let temp = arrays[checkbox.target.name].filter(x => x != checkbox.target.value)
       arrays[checkbox.target.name] = temp
    }

//הסלקט התחלה
const [checked, setChecked] = React.useState([]);
// const [left, setLeft] = React.useState([0, 1, 2, 3]);
// const [right, setRight] = React.useState([4, 5, 6, 7]);

// const leftChecked = intersection(checked, left);
// const rightChecked = intersection(checked, right);

const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};

const numberOfChecked = (items) => intersection(checked, items).length;

const handleToggleAll = (items) => () => {
  if (numberOfChecked(items) === items.length) {
    setChecked(not(checked, items));
  } else {
    setChecked(union(checked, items));
  }
};

// const handleCheckedRight = () => {
//   setRight(right.concat(leftChecked));
//   setLeft(not(left, leftChecked));
//   setChecked(not(checked, leftChecked));
// };

// const handleCheckedLeft = () => {
//   setLeft(left.concat(rightChecked));
//   setRight(not(right, rightChecked));
//   setChecked(not(checked, rightChecked));
// };
const customList = (title, items, inds) => (
    <Card>
      <CardHeader          
          sx={{ px: 2, py: 1 }}
        // avatar={
        //   <Checkbox
        //     onClick={handleToggleAll(items)}
        //     checked={// sign plus (-if all checked)
        //       numberOfChecked(items) === items.length && items.length !== 0}
        //     indeterminate={// sign minus* or empty** (-if at least one checked* or no one**)  
        //       numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}          
        //     disabled={items.length === 0}
        //     inputProps={{
        //       'aria-label': 'all items selected',
        //     }}
        //   />
        // }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} נבחרו`}
      />
      <Divider />
      <List
        sx={{
          //  width: 200,
           height: 180,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.id}-label`;//Id

          return (
            <ListItem
              key={value.Id}//Id
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  name={inds} value={value.id} onClick={xx}//
                  // checked={checked.indexOf(value) !== -1}//Id
                  // tabIndex={-1}
                  // disableRipple
                  // inputProps={{
                  //   'aria-labelledby': labelId,
                  // }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={title=="סוג אטרקציה"?`${value.type}`:
                title=="קהל"?`${value.person}`:null } /> 
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
//הסלקט סוף
    return(<>

      <Grid container spacing={2} justifyContent="center" alignItems="center" display="block" >
      <Grid item >{customList('קהל', person, 2)}</Grid>{/* width="min-content" */}
      <Grid item >{customList('סוג אטרקציה', attractionTypes, 0)}</Grid> 
      </Grid>
      <Box sx={{ width: 300 }}>
        <p>מחיר</p>
      <Slider
        max={1000} min={0}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <div style={{display:'flex'}}><p> ש"ח </p><p>{' '} {value[0]+" - "+value[1]}</p></div>
    </Box>
        {/* <form name="myForm2"  > */}
            {/* onSubmit={handleSubmit(save)} */}
            {/* ref={x} */}
        {/*  <ul>
       <label>סוג אטרקציה</label><br/>
       
        {attractionTypes.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Type} name={0} value={item.Id} onClick={xx}/>
                <label>{item.Type}</label><br/>             
            </li>
        )}
         </ul>
         <ul>
         <label>מדינות</label><br/>
       
        {countries.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Country} name={1} value={item.Id} onClick={xx}/>
                <label>{item.Country}</label><br/>
            </li>
        )}
        </ul>
        <ul>
        <label>גילאים</label><br/>
       
        {person.map(item=>
            <li key={item.Id}>
                <input type="checkbox" className={item.Person} name={2} value={item.Id} onClick={xx}/>
                <label>{item.Person}</label><br/>
            </li>
        )}
        </ul>
        <input type="submit" value="Submit" />
        <input type="reset"  value="אפס"></input>
       
       

        </form> */}
    {/* <FormGroup>
       <ul>
            {countries.map(item=> <li><FormControlLabel control={<Checkbox defaultChecked />} label={item.Type} /></li>)}
      </ul>
    </FormGroup> */}
    </>)
}

