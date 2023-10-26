import * as React from 'react';
import Card from '@mui/material/Card';
//import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import "../StyleComponents/OneDestination.scss";
// import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import OneAttraction from './OneAttraction';
import { CardActionArea } from '@mui/material';
export default function OneDestination({ attraction }) {
  return (<>
    <Card className='card' >
      {/* כרטיס לא לחיץ */}
    {/* onClick={() => alert("ff")} */}
      <CardActionArea >
        <div className='photo-erea'>
          מקום לתמונה
          <CardMedia
            sx={{ height: 100 }}
            //???אין תמונה
            // image= ".../imgs/items/aw1.jpg"
            title="green iguana"
          />
        </div>
        <CardContent className='content'>
          <h1>{attraction.name}</h1>
          {/* <Typography  color="text.primary"> */}
          <h2>{attraction.desc}</h2>
          {/* </Typography> */}
        </CardContent>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
         </CardActionArea>
    </Card>

  </>)
}  
