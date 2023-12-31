import { useEffect, useState } from "react"
import { usersFromServer } from "../services/user"
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from "@mui/base";
import { changeStatusFromServer } from "../services/user"
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
    return (<>
      {alert("mng")}
        <ul>
            {users.map(user => <li key={user.id}>{user.name + " " + user.status}
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

            </li>)}
        </ul>


    </>)
}
//שינוי ססטוס למשתמש
// const [open, setOpen] = React.useState(false);
// const anchorRef = React.useRef(null);
// const [selectedIndex, setSelectedIndex] = React.useState(1);

// const handleClick = () => {
//   console.info(`You clicked ${options[selectedIndex]}`);
// };

// const handleMenuItemClick = (event, index) => {
//   setSelectedIndex(index);
//   setOpen(false);
// };

// const handleToggle = () => {
//   setOpen((prevOpen) => !prevOpen);
// };

// const handleClose = (event) => {
//   if (anchorRef.current && anchorRef.current.contains(event.target)) {
//     return;
//   }

//   setOpen(false);
// };

//  return

{/* <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
<Button onClick={handleClick}>{options[selectedIndex]}</Button>
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
              key={option}
              disabled={index === 2}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </ClickAwayListener>
    </Paper>
  </Grow>
)}
</Popper> */}