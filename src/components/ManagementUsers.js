import { useEffect, useState } from "react"
import { changeTypeFromServer, usersFromServer } from "../services/user"
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function ManagementUsers() {
  const [users, setUsers] = useState([]);
  const [filterArr, setFilterArr] = useState([]);


  useEffect(() => {
    usersFromServer().then(res => {
      console.log(res.data)
      setUsers(res.data)
    }).catch(err => console.log(err))
    //מביא הערה על המערך הריק שכאן
  }, []);
  //משנה סטטוס בשרת ולא בתצוגה
  const handleChange = (user) => {
    changeStatusFromServer(user.user).then(res => {
      const copy = user.map(x => ({ ...x, status: x.id === user.user.id ? !x.status : x.status }));
      setUsers(copy)
    }).catch(err => { console.log("error", err) });
  };
  const options = [{ id: 1, type: 'משתמש' }, { id: 2, type: 'מנהל' }];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  // let דברים שמשתנים באותו הדף ממש ולא אחרי רענון יהיו מוגדרים 
  let [msg, setMsg] = useState("");
  const handleClick = (userId, event, index) => {

    setSelectedIndex(index);
    setOpen(false);
  };
  // const filterFunc = (e) => {
  //   console(e.target.value)
  //   const copy = [...users];
  //   copy = users.filter(i => i.status == e.target.value);
  //   setFilterArr(copy)
  //   console.log(filterArr);
  // }
  const handleMenuItemClick = (event, index, userId) => {
    const user = { id: open, typeId: options[selectedIndex].id }
    changeTypeFromServer(user).then(res => {
      setMsg(res.data);
      alert(res.data)
      const copy = [...users];
      const findIndex = copy.findIndex(x => x.id == open)
      if (findIndex > -1) {

        copy[findIndex].type = options[selectedIndex].type
        setUsers(copy)
      }
    }).catch(err => { alert("התרחשה תקלה"); console.log("error resp:", err) })
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = (userId) => {
    setOpen((prevOpen) => prevOpen ? false : userId);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  return (<>
    {/* <ul className="mn-users"> */}
    {/* {users.map(user => <li key={user.id}>
        <div>


        {user.name} {user.email} 
        {user.status == false ?<h5>לא פעיל</h5> :<h5> פעיל</h5> }   

          {/* {user.status === false ? <FormControlLabel
                    control={
                        <Switch checked={false} onChange={handleChange(user)} />
                    }
                /> : <FormControlLabel
                    control={
                        <Switch checked={true} onChange={handleChange(user)} />
                    }
                />} */}
    {/* <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button>{user.type}</Button>
            <Button
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={() => handleToggle(user.id)}
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
                          onClick={(event) => handleMenuItemClick(event, index, user.id)}
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

    </ul> */}
    {/* <Button onClick={filterFunc(true)}>פעילים</Button> */}

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>משתמשים</TableCell>
            <TableCell align="right">סטטוס</TableCell>
            <TableCell align="right">מייל</TableCell>
            <TableCell align="right">סוג</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              {user.status == false ? <TableCell>לא פעיל</TableCell> : <TableCell> פעיל </TableCell>}
              <TableCell><Button sx={{ width: "40px" }} onClick={() => handleChange({ user })} >שינוי סטטוס</Button></TableCell>

              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">   <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button>{user.type}</Button>
                <Button
                  size="small"
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={() => handleToggle(user.id)}
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
                                onClick={(event) => handleMenuItemClick(event, index, user.id)}
                              >
                                {option.type}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper></TableCell>
              <TableCell align="right">{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>










  </>)
}
