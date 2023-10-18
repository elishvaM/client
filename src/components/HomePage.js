import * as React from 'react';
import "../StyleComponents/HomePage.scss";
import { useSelector } from "react-redux";
import OneDestination from "./OneDestination";
import { useEffect } from 'react';
import "../StyleComponents/HomePage.scss";
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
