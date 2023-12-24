import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PicNavBar({setDetails}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // let [att, setAtt] = useState([
  //   {Id:1, src:"115797440.jpg", Name:"טיול ג'יפים" , Adress:""},
  //   {Id:2, src:"152255613.jpg", Name:"מוזיאון", Adress:""},
  //   {Id:3, src:"192190375.jpg", Name:"ההיטוריה שלכם", Adress:""},
  //   {Id:4, src:"203267750.jpg", Name:"שיט", Adress:""},
  //   {Id:5, src:"Image by Aaron Burden.webp", Name:"גלגל ענק", Adress:""},
  //   {Id:6, src:"אטרקציה-לילדים-בחופש.jpg", Name:"לונה פארק", Adress:""},
  //   {Id:7, src:"אטרקציות-בפריז.webp", Name:"פריז", Adress:""},
  //   {Id:8, src:"אטרקציות-לירח-דבש-לרומא.jpg", Name:"ירח דבש", Adress:""},
  // ])
  let [id, setId] = useState(0);
  function drag(e){
    console.log("kmhtmyj")
    setId(id+1)
    console.log(id)//??? כדאי להעביר ל דרופ כדי שלא סתם יעלה ב ת"ז
    setDetails({Id:id, AttractionId :e.target.key, Name:e.target.name, Status:false});
    e.dataTransfer.setData("text", e.target.className);
console.log(e.dataTransfer)
    // e.dataTransfer.setData("text", e.target.name);
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        width:1120,
        // maxWidth: { xs: 1500, sm: 0 },
        bgcolor: 'background.paper',
        position:'absolute',left:"1rem"
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {/* צריך להיות כרשימה li ??? */}
        {/* {att.map(i=><>
        {console.log("iiiii")}
        {console.log(i)}
            <img src={`/imgs/att/${i.img}`}
            style={{borderRadius:'15px 15px 0px 0px',
             width:480, height:200, padding:5}} name= {i.name} key={i.id} 
             className='dragData' draggable="true" onDragStart={(e)=>drag(e)}/></>
            //  <p>{i.Name}</p>  
            // </div>
            )} */}
              
                  
        {/* <Tab label="Item Seven" /> */}
      </Tabs>
    </Box>
  );
}
