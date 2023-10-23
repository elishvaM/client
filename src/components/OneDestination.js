import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import "../StyleComponents/OneDestination.scss";
export default function OneDestination({ attraction }) {
  return (<>
    <Card className='card'>
      <div className='photo-erea'>
      מקום לתמונה
        {/* <CardMedia
          sx={{ height: 110 }}
          image=".../imgs/items/aw1.jpg"
          title="green iguana"
        /> */}
      </div>
      <CardContent className='content'>
        <h2>{attraction.name}</h2>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica בבבבבבבבבבבבבבבבבבבבבב
        </Typography>
      </CardContent>

    </Card>
    
  </>)
}  
