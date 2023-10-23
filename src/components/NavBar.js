import { Link } from "react-router-dom";
import "../StyleComponents/NavBar.scss";
import * as React from 'react';
import Button from '@mui/material/Button';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import LoginIcon from '@mui/icons-material/Login';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import AttractionsIcon from '@mui/icons-material/Attractions';
// import Face6Icon from '@mui/icons-material/Face6';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useEffect } from "react";
import { usersFromServer } from "../services/user";
import Login from "../components/Login";
import Slide from '@mui/material/Slide';

export default function NavBar() {
    useEffect(() => { usersFromServer().then(res => console.log(res)) }, [])
    // const [value, setValue] = React.useState(0);
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

    //submit/cancel-dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    })
    // const handleClose = () => {
    //     setOpen(false);
    // };
    //current user
    let currentUser = useSelector(state => state.user.currentUser);
    return (
        <>
            {/* header, nav bar */}
            {currentUser != null && console.log("cur us",currentUser)}
            {currentUser != null && <div>שלום {currentUser.name}</div>}
            <div className="header-navbar">
                <header>
                    <nav className="headers-erea">
                        <div>
                            <div>
                                <span><Link className="header" link to="Destinations" underline="none">
                                    SmartLists.Com
                                </Link></span>
                            </div>
                        </div>
                        <div className="user-erea">
                            <div>  <LightTooltip title="הרשמה"><Button size="large" >  < VpnKeyOutlinedIcon /> </Button></LightTooltip>
                            </div>
                            <div >
                                <LightTooltip title="כניסה">
                                    <Button size="large" onClick={handleClickOpen}>< AccountCircleOutlinedIcon /> </Button>
                                </LightTooltip>

                                {/*לא אמורים לקרוא לקומפוננטה */}
                                <Login open={open} TransitionComponent={Transition} />

                            </div>
                            <div>  <LightTooltip title="בקשת אטרקציה" className="addAtt"><Button size="large" variant="contained">  בקשת אטרקציה</Button></LightTooltip>
                            </div>

                        </div>
                    </nav>
                    <nav className="links-erea">
                        <div className="ul-erea">
                            <ul className="links-ul">
                                <li className="button-nav" > <Button className="links-nav" size="small" onClick={() => mynavigate("destinations")}
                                    variant="filled"  >  <AttractionsIcon />  אטרקציות </Button></li>
                                <li className="button-nav">  <Button className="links-nav" size="small" onClick={() => mynavigate("about")}
                                    variant="filled" >   <InfoOutlinedIcon />   קצת עלינו   </Button></li>
                                <li className="button-nav"> <Button className="links-nav" size="small" onClick={() => mynavigate("contact")}
                                    variant="filled"  >   <ContactSupportOutlinedIcon />  צור קשר </Button></li>
                            </ul>
                        </div>
                    </nav>

                </header>
            </div>
        </>
    );
}