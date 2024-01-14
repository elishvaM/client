import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveCurrentAttractionListId } from '../store/actions/list';
import { pink } from '@mui/material/colors';

export function AttractionLists({attractionsDay}){
  const mynavigate = useNavigate();
  const dispatch = useDispatch();
  const [color, setColor] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    return (<>
  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', direction:"ltr" }}>
      <List component="nav" aria-label="main mailbox folders">
      {console.log(attractionsDay)}
      {attractionsDay?.map(attractionList => 
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon onClick={() =>
                            {dispatch(saveCurrentAttractionListId(attractionList.id));
                            mynavigate(`/lists/${attractionList.attractionId}/mylist/${attractionList.id}/${attractionList.attractionId}` )                          
                             }} 
                        onMouseEnter={()=>setColor(true)} onMouseLeave={()=>setColor(false)} 
           > 
          <EditNoteIcon fontSize='medium' color="primary"/>
          </ListItemIcon>
          <ListItemText primary={attractionList.attraction.name} />
        </ListItemButton>)}
        {attractionsDay.length!=0?<ListItemButton>
        <ListItemIcon  onClick={() => { mynavigate(`/lists/${attractionsDay}/mylist/${attractionsDay.attractionList[0].id}` )}}>
          <EditNoteIcon fontSize='medium' sx={{ color: pink[500] }}/></ListItemIcon>
        <ListItemText primary="לרשימה כוללת" />
        </ListItemButton>:null}
        </List>
        </Box>
        </>)
}
{/* <Tooltip title="צור רשימה"><IconButton sx={{position:"absolute", marginRight:26}}><CreateIcon onClick={() =>
{dispatch(saveCurrentAttractionListId(attractionList.id));
  navigate(`/mypage/editedlists/${attractionList.attractionId}` )
    //navigate(`/mylist/${attractionList.id}/${attractionList.attractionId}`)  

  }}/></IconButton></Tooltip>

</li> */}