import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from 'react';
import OneDestination from "./OneDestination";
import "./Filter.scss";
import "../StyleComponents/HomePage.scss";


// הסינון
import Filter from "./Filter";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
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

export default function HomePage(){
    let arr = useSelector(state=> state.attraction.filtering);

    let arrSelector = useSelector(state=> state.attraction.attractions);

    const defaultProps = {
        // val: (option) => option.Id,
        options: arrSelector,
        getOptionLabel: (option) => option.Name  
    };

    useEffect(() => {
        //ללכת לשלוף את כל האטרקציות מהשרת
       
    }, [])

    let [displayFilter,setDisplayFilter] = useState(false);
    const m = (x)=>{
      console.log("mmmm", x.target)
      // console.log("mmmm", x.target.val)  
    }
    return(<>
     <Stack spacing={1} sx={{ width: 300 }} onClick={m} >
      <Autocomplete
        {...defaultProps}
        id="disable-clearable"
        
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="disableClearable" variant="standard"  />
        )}
      />
      </Stack>
    
  
        <Paper
        className='search'
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
        //   {...defaultProps}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        //   renderInput={(params) => (
        //     <TextField {...params} label="disableCloseOnSelect" variant="standard" />
        //   )}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>    
      

      {/* הסינון */}
      <BootstrapButton variant="contained" disableRipple
        sx={{ marginLeft: '63vw'}} onClick={ ()=>{ setDisplayFilter(true); }  }>
        סינון
      </BootstrapButton>
       {displayFilter==true?
       <Filter/>:null}
     


     {/* הצגת האטרקציות */}
      <ul className='ul'>
            {arr.map(item=> <li key={item.Id} className='li'><OneDestination x={item} /></li>)}
      </ul>
     </>
    )

}
// calld to links
// למה כתבו מחוץ. האם יש עדיפות מה  ההבדל ?????
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
];