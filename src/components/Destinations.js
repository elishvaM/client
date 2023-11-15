import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import "../StyleComponents/Destination.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import OneDestination from "./OneDestination";
import Filter from "./Filter";
import "../StyleComponents/HomePage.scss";
// הסינון
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { attractionFromServer } from '../services/attraction';
import { saveAttractions } from '../store/actions/attraction';
import { savedAttractionByUserIdFromServer } from "../services/attraction";

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default function Destination() {
  // let arr = useSelector(state => state.attraction.filtering);
  let dispatch = useDispatch();
  let arrSelector = useSelector(state => state.attraction.attractions);

  const defaultProps = {
    // val: (option) => option.Id,
    options: arrSelector,
    getOptionLabel: (option) => option.Name
  };
  let lovedAttractions;
  let id = 8;
  useEffect(() => {
    if(attractions.length == 0){
    savedAttractionByUserIdFromServer(id).then(res =>{console.log(res)
      lovedAttractions = res.data; }).catch(err=> console.log(err))
    //fatch all the attraction from server
    attractionFromServer().then(res => {
      dispatch(saveAttractions(res.data, lovedAttractions));
    }).catch(err => { console.log(err) })
  }
  }, []);

  let attractions = useSelector(state => state.attraction.attractions);
  let [displayFilter, setDisplayFilter] = useState(false);
  const m = (x) => {
    console.log("mmmm", x.target)
    // console.log("mmmm", x.target.val)  
  }
  return (<>
    <div className='attraction-content'>
      <div className='attraction-header'><h1>אטרקציות,חוויות ופעילויות</h1>
        <h2>בואו לבחור את החוויה הבאה</h2>
      </div>
      
    </div>
    <Stack spacing={1} sx={{ width: 300 }} onClick={m} >
      <Autocomplete
        {...defaultProps}
        id="חפש"

        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="חפש יעד" variant="standard" />
        )}
      />
    </Stack>
    <Paper
      className='search'
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="  לאן נוסעים ? "
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    
    {/* הסינון */}
    <BootstrapButton variant="contained" disableRipple
      sx={{ marginLeft: '63vw' }} onClick={() => { setDisplayFilter(true); }}>
      סינון
    </BootstrapButton>
    {displayFilter === true ?
      <Filter /> : null}
    {/* הצגת האטרקציות */}
    <ul className='ul-dest'>
      {/* למה השורה הבאה שבהערה לא עבדה ??? */}
      {/* {attractions.length!== 0?attractions.map(i => <li key={i.id}><h1>{i.isLoved}</h1></li>):null} */}
      {attractions.length !== 0 ? <div>{attractions.map(item => <li key={item.id}>{console.log("s "+item.isLoved)}<OneDestination attraction={item} /></li>)}</div> : null}
    </ul>
    {attractions.map(i => console.log(i.id+" "+i.isLoved))}{console.log("ui",attractions)}
  </>
  )
}
