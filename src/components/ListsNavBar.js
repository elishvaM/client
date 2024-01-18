import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GetAttractionListByAttractionIdFromServer } from "../services/list";
import { useSelector } from 'react-redux';

export default function ListsNavBar(){
  const { attractionId } = useParams();
  const currentAttractionListId = useSelector(s=> s.list.currentAttractionListId)
    const mynavigate = useNavigate()
    const [othersLists, setOthersLists] = React.useState([]);
    useEffect(()=>{
      GetAttractionListByAttractionIdFromServer(attractionId,currentAttractionListId).then(res=>
        setOthersLists(res.data)
     ).catch(err=>"err "+err)
    },[])
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    return(<>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position:"absolute", right:"1rem", top:"15rem" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         רשימות לאטרקציה זו
        </ListSubheader>
      }
    >
      <ListItemButton onClick={()=>mynavigate(`mylist/${currentAttractionListId}/${attractionId}`)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="הרשימה שלי" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="צפה ברשימות ערוכות" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {othersLists.length>0?othersLists.map(list=>
      <Collapse in={open}    timeout="auto" unmountOnExit>
        {/* <List component="div" disablePadding> ??? להוסיף*/}
          <ListItemButton key={list.id} sx={{ pl: 4 }}  onClick={()=>mynavigate('editedlist', { state: list })}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={list.exitDate} />
          </ListItemButton>
        {/* </List> */}
      </Collapse>
      ):"אין רשימות קיימות"}
    </List>
    <Outlet/>
    </>)
}


