import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';


function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
    return Array.from(new Array(50)).map(
      () => messageExamples[getRandomInt(messageExamples.length)],
    );
  }
export default function ItemsNavBar(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return( <>
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper',  mx:"auto" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="ביגוד" icon={<RestoreIcon />}/>
        <Tab label="רפואי" icon={<FavoriteIcon />}/>
        <Tab label="אביזר" icon={<ArchiveIcon />}/>
        <Tab label="אסטטיקה" icon={<RestoreIcon />}/>
        <Tab label="Item Five" icon={<FavoriteIcon />}/>
        <Tab label="Item Six" icon={<ArchiveIcon />}/>
        <Tab label="Item Seven" icon={<RestoreIcon />}/>
      </Tabs>
    </Box>
     </>
    )
}

const messageExamples = [
    {
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: '/static/images/avatar/5.jpg',
    },
    {
      primary: 'Birthday Gift',
      secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      person: '/static/images/avatar/1.jpg',
    }
]