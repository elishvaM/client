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
import { useDispatch } from 'react-redux';
import { addLovedAttraction, removeLovedAttraction } from '../store/actions/attraction';
import { useNavigate } from 'react-router-dom';

export default function OneDestination({ attraction }) {
  let mydispatch = useDispatch();
  let mynavigate = useNavigate();
  const Vaar=()=>{mynavigate("/mytrip")}
  return (<>
    <Card className='card'>

      <CardActionArea onClick={() => console.log("ff")} >
        <div className='photo-erea'>
          מקום לתמונה
          <CardMedia
            sx={{ height: 100 }}
            //???אין תמונה
            image="../imgs/items/aw1.jpg"
            title="green iguana"
          />
        </div>
        <CardContent className='content'>
          <h1>{attraction.name}</h1>
          {/* <Typography  color="text.primary"> */}
          <h2>{attraction.desc}</h2>
          {/* </Typography> */}
        </CardContent>
        <IconButton aria-label="add to favorites" 
                    onClick={() => {attraction.isLoved?
                      mydispatch(removeLovedAttraction(attraction.id)):
                    mydispatch(addLovedAttraction(attraction))
                      } }>
          <FavoriteIcon color={attraction.isLoved?"error":"none"}/>
        </IconButton>
      </CardActionArea>
    </Card>

  </>)
}  
