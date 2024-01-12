import { useEffect, useState } from "react"
import { changeTypeFromServer, usersFromServer } from "../services/user"
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from "@mui/base";
import { changeStatusFromServer } from "../services/user";
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import "../StyleComponents/ManagementUsers.scss";
export default function ManagementUsers() {
  const [users, setUsers] = useState([]);
  let copy = [...users]
  
  useEffect(() => {
    usersFromServer().then(res => {
      setUsers(res.data)
    }).catch(err => console.log(err))
    //מביא הערה על המערך הריק שכאן
  }, []);
  //משנה סטטוס בשרת ולא בתצוגה
  const handleChange = (user) => {
    changeStatusFromServer(user.user).then(res => {
      copy.map(x => x.id === user.user.id ? x.status = !x.status : null)
      setUsers(copy)
    }).catch(err => { console.log("error", err) });
  };
  const options = [{ id:1, type: 'משתמש' }, { id: 2, type: 'מנהל' }];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  // let דברים שמשתנים באותו הדף ממש ולא אחרי רענון יהיו מוגדרים 
  let [msg, setMsg] = useState("");
  const handleClick = (userId, event, index) => {
   
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleMenuItemClick = (event, index,userId) => {
    const user = { id: userId, typeId: options[selectedIndex].id }
    console.log(user)
    console.log(options[selectedIndex].type)
    console.log("be",copy)
    copy.map(x => x.id === user.id ? x.type = options[selectedIndex].type == "משת": null)
    console.log("cp",copy)
    // changeTypeFromServer(user).then(res => {
    //   setMsg(res.data);
    //   alert(res.data)
    //   copy.map(x => x.id === user.id ? x.type = options[selectedIndex].type : null)
    //   setUsers(copy)
    // }).catch(err => { alert("התרחשה תקלה"); console.log("error resp:", err) })
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  return (<>
    <ul className="mn-users">
      {users.map(user => <li key={user.id}>
        <div>  


        {user.name}    {user.status}
        <Button onClick={() => handleChange({ user })} >שינוי סטטוס</Button>

        {/* {user.status === false ? <FormControlLabel
                    control={
                        <Switch checked={false} onChange={handleChange(user)} />
                    }
                /> : <FormControlLabel
                    control={
                        <Switch checked={true} onChange={handleChange(user)} />
                    }
                />} */}
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
          <Button>{user.type}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.id}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick( event, index,user.id)}
                      >
                        {option.type}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>


        </div>
        

      </li>)}

    </ul>


  </>)
}
