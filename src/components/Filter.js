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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//checkbox
import { personStateFromServer } from "../services/personState";
import { attractionFromServer } from '../services/attraction';
import { attractionTypeFromServer } from '../services/attractionType';
export default function Filter() {

  const [personState, setPersonState] = React.useState();
  const [attractionType, setAttractionType] = React.useState();
  const [select, setSelect] = React.useState([]);

  React.useEffect(() => {
    personStateFromServer().then(res => {
      setPersonState(res.data)
    }).catch(err => console.log(err))
    attractionTypeFromServer().then(res => {
      setAttractionType(res.data)
    }).catch(err => console.log(err))
  }, [])
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const selectUser = (e, choose) => {
    let copy = [...select]
    //הוא מסומן
    if (e.target.checked) {
      copy.push(choose)
      setSelect(copy)
    }
    //הוא הוריד סימון
    else {
      const remove = copy.filter(x => x != choose)
      setSelect(remove)
    }
  }


  //הסלקט סוף
  return (<>
    {/* <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <h3>קהל יעד</h3>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
    </div> */}
    <div>
      <h3>סוג האטרקציה</h3>
      <FormGroup>
        {attractionType?.map(x => <FormControlLabel onClick={(e) => selectUser(e, x.type)} control={<Checkbox />} label={x.type} />)}
      </FormGroup>
    </div>
    <div>
      <h3>קהל יעד</h3>
      <FormGroup>
        {personState?.map(x => <FormControlLabel control={<Checkbox />} label={x.state} />)}
      </FormGroup>
    </div>



  </>
  )
}

