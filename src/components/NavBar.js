import { Link } from "react-router-dom";

import "../StyleComponents/NavBar.scss";
import * as React from "react";
import Button from "@mui/material/Button";
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import LoginIcon from '@mui/icons-material/Login';
import AttractionsIcon from "@mui/icons-material/Attractions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Login from "../components/Login";
import Slide from "@mui/material/Slide";
import SighIn from "./SighIn";
import { changeUserLocation } from "../store/actions/user";
import { useDispatch } from "react-redux";
import { logOut } from "../store/actions/user";
export default function NavBar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  let mynavigate = useNavigate();
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
  }));
  const logout = () => {
    dispatch(logOut(currentUser));
  }
  //submit/cancel-dialog
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <>
      <div className="header-navbar">
        <header>
          <nav className="headers-erea">
            <div>
              <div>
                <span>
                  <Link
                    className="header"
                    link
                    to="Destinations"
                    underline="none">
                    SmartLists.Com
                  </Link>
                </span>
              </div>
            </div>
            <div className="user-erea">
              <div>
                <LightTooltip title="הרשמה">
                  <Button size="large" onClick={() => {
                    setOpen2(true);
                  }}>
                    <VpnKeyOutlinedIcon />
                  </Button>
                </LightTooltip>
                {open2 ? <SighIn open={open2} setOpen={setOpen2} TransitionComponent={Transition} /> : null}
              </div>
              {currentUser === null ? <div>
                <LightTooltip title="כניסה">
                  <Button size="large" onClick={() => { setOpen(true); }}>
                    <AccountCircleOutlinedIcon
                    />
                  </Button>
                </LightTooltip>
              </div> : <div>
              <LightTooltip title="יציאה">
                  <Button size="large" onClick={logout}>
                  LogOut
                  </Button>
                </LightTooltip>
                <LightTooltip title="לאיזור האישי" className="">
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => {dispatch(changeUserLocation(true));mynavigate("/mypage")}}>
                    לאיזור האישי
                  </Button>
                </LightTooltip>
              </div>}
              {open ? <Login
                setOpen={setOpen}
                TransitionComponent={Transition}
              /> : null}
            </div>
          </nav>
          <nav className="links-erea">
            <div className="ul-erea">
              <ul className="links-ul">
                <li className="button-nav">
                  <Button
                    className="links-nav"
                    size="small"
                    onClick={() => mynavigate("destinations")}
                    variant="filled">
                    <AttractionsIcon /> אטרקציות
                  </Button>
                </li>
                <li className="button-nav">
                  <Button
                    className="links-nav"
                    size="small"
                    onClick={() => mynavigate("about")}
                    variant="filled">
                    <InfoOutlinedIcon /> קצת עלינו
                  </Button>
                </li>
                <li className="button-nav">
                  <Button
                    className="links-nav"
                    size="small"
                    onClick={() => mynavigate("contact")}
                    variant="filled">
                    <ContactSupportOutlinedIcon /> צור קשר{" "}
                  </Button>
                </li>

                {currentUser?.userTypeId === 2 ?
                  <>
                    <li className="button-nav">
                      <Button
                        className="links-nav"
                        size="small"
                        onClick={() => mynavigate("managementUsers")}
                        variant="filled">
                        <ContactSupportOutlinedIcon /> ניהול משתמשים
                      </Button>
                    </li>
                    <li className="button-nav">
                      <Button
                        className="links-nav"
                        size="small"
                        onClick={() => mynavigate("managementItems")}
                        variant="filled">
                        <ContactSupportOutlinedIcon /> ניהול פריטים
                      </Button>
                    </li>
                    <li className="button-nav">
                      <Button
                        className="links-nav"
                        size="small"
                        onClick={() => mynavigate("addAttraction")}
                        variant="filled">
                        <ContactSupportOutlinedIcon />הוספת אטרקציה
                      </Button>
                    </li>
                    <li className="button-nav">
                      <Button
                        className="links-nav"
                        size="small"
                        onClick={() => mynavigate("managementComments")}
                        variant="filled">
                        <ContactSupportOutlinedIcon />תגובות שדווחו 
                      </Button>
                    </li>

                    
                  </> : null}
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
