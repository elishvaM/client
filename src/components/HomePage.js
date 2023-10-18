import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "../StyleComponents/HomePage.scss";
import { useSelector } from "react-redux";
import OneDestination from "./OneDestination";
import { useEffect } from 'react';
import "../StyleComponents/HomePage.scss";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import OneUser from './OneUser';
export default function HomePage() {
  let arr = useSelector(state => state.attraction.chosen);
  let users = useSelector(state=>state.user.users);
  useEffect(() => {
    //ללכת לשלוף את כל האטרקציות מהשרת
  }, [])
  return (<>
    <h1>אטרקציות מובילות</h1>
    <ul className='ul-dest'>
      {arr.map(item => <li key={item.Id} className='li'><OneDestination x={item} /></li>)}
    </ul>
    <h1>משתמשים מובילים </h1>
    <ul className='ul-dest'>
      {users?.map(item => <li key={item.Id} className='li'><OneUser user={item} /></li>)}
    </ul>
  </>)
}
