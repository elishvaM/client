import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import About from "./components/About";
import Contact from "./components/Contact";
import SighIn from "./components/SighIn";
import Login from "./components/Login";
import NavBar from './components/NavBar';
import Destinations from './components/Destinations';
import MyList from './components/MyList';
import ManagementUsers from './components/ManagementUsers';
import MyTrip from './components/MyTrip';
import MyPage from './components/MyPage';
import LovedAttractions from './components/LovedAttractions';
import OneDestinationDetails from './components/OneDestinationDetails';
import AddAttraction from './components/AddAttraction';
import { Button } from "@mui/base";
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// app first page
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* כללי */}
        <Route path="homepage" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="oneDestinationDetails" element={<OneDestinationDetails />} />
        <Route path="sighin" element={<SighIn />} />
        {/* <Route path="login" element={<Login />} /> */}
        {/* אישי */}
        <Route path="mylist/:id" element={<MyList />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path='mypage/love' element={<LovedAttractions />} />
        <Route path="mypage/mytrip/:tripId" element={<MyTrip />} />
        {/* מנהל */}
        <Route path="managementUsers" element={<><ManagementUsers /></>} />
        <Route path="addAttraction" element={<AddAttraction />} />
        {/* הוספת אטרקציה עדכון  */}
        <Route path="*" element={<Destinations />} />
      </Routes>
    </div>
  );
}

export default App;
