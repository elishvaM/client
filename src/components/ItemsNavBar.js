import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Items from './Items';
import { useState } from 'react';
import { useEffect } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { DisplaySettingsOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// function refreshMessages() {
//     const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
//     return Array.from(new Array(50)).map(
//       () => messageExamples[getRandomInt(messageExamples.length)],
//     );
// }
export default function ItemsNavBar(){
    const [value, setValue] = React.useState(0);
    const [name, setName] = React.useState("");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    //
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    //
    let [display, setDisplay] = useState(0);
    let productTypes = useSelector(s => s.item.productTypes);

    return( <>
    {/* ?? צריך בשורה הבאה את הצבע רקע בעצם הוא שייך לחיצים הקטנים */}
    <Box sx={{ maxWidth: { xs: 320, sm: 680 }, bgcolor: 'background.paper',  mx:"auto" , display:"block", position:"absolute", top:"7rem"}}>
      <Tabs
        value={value}
        //key={}//???  
       // name={name} ??? אני צריכה את השם- הסוג כדי להציגו ככותרת
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{backgroundColor:"rgb(5, 30, 52)", color:"white", width:"82vw"}}
      >
      {productTypes?.map(i=>
        <Tab label={i.type} icon={<RestoreIcon />} sx={{color:"white"}} value={i.id}
         // name={i.Type} key={i.Id} 
        />
          
      )}
      </Tabs>
      {/* אם שינתי בסטייט לערך השווה לערך שהיה בו מקודם הסטייט לא מתעדכן??? */}
    {value>0?<><Items type={name} setValuefrom={setValue} valuefrom={value}/>
    </>:null}
    {/* what={display} */}  
    </Box>
     </>
    )
}
