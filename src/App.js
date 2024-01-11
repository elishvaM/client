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
import * as React from 'react';
import ManagementComments from './components/ManagementComments';
import EditedList from './components/EditedList';
import { NavBarPersonalArea } from './components/NavBarPersonalArea';
import { useSelector } from 'react-redux';
import EditedLists from './components/EditedLists';
// app first page
function App() {
  const isInPersonalArea = useSelector(s=> s.user.isInPersonalArea);
  return (
    <div className="App">
      {!isInPersonalArea?<NavBar />:<NavBarPersonalArea/>}
      <Routes>
        {/* כללי */}
        <Route path="homepage" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="oneDestinationDetails" element={<OneDestinationDetails />} />
        <Route path="sighin" element={<SighIn />} />
        <Route path="login" element={<Login />} />
        {/* אישי */}
        
        <Route path="/mylist/:listId" element={<MyList />} />

        <Route path="mypage" element={<MyPage />} >
          <Route path='love' element={<LovedAttractions />} />
          <Route path="mytrip/:tripId" element={<MyTrip />} />
          <Route path="editedlists/:attractionId" element={<EditedLists />} >
          <Route path="mylist/:id/:attractionId" element={<MyList />} />{/*??? attractionListId הכוונה ל id */}
          <Route path="editedlist" element={<EditedList />} />
          
          </Route>
        </Route>
        {/* מנהל */}
        <Route path="managementUsers" element={<><ManagementUsers /></>} />
        <Route path="managementComments" element={<><ManagementComments /></>} />
        <Route path="editedlist" element={<EditedList/>} />

        
        <Route path="addAttraction" element={<AddAttraction />} />
        {/* הוספת אטרקציה עדכון  */}
        <Route path="*" element={<Destinations />} />
      </Routes>
    </div>
  );
}

export default App;
