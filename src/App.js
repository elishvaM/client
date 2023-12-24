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
// app first page
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* home page */}
        <Route path="homepage" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<SighIn />} />
        <Route path="login" element={<Login />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="mytrip" element={<div className='mypage'><MyTrip /></div>} />
        <Route path="mylist/:id" element={<MyList />} />
        <Route path="managementUsers" element={<ManagementUsers />} />
        <Route path="lovedattractions" element={<><LovedAttractions /></>} />
        <Route path="mypage" element={<MyPage />} >
          <Route path='love' element={<Destinations />} />

        </Route>
        <Route path="*" element={<Destinations />} />
      </Routes>
    </div>
  );
}

export default App;
