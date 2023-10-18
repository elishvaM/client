import * as React from 'react';
import "../StyleComponents/Filter.scss";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import Tooltip from '@mui/material/Tooltip';

import { useNavigate } from "react-router-dom";
import List from "./MyList";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
  //⏲ שייך לליוח זמנים
  import Button from '@mui/material/Button';
  import Box from '@mui/material/Box';
  import Stack from '@mui/material/Stack';
  // import {
  //   DataGridPro,
  //   GridToolbarContainer,
  //   GridToolbarDensitySelector,
  //   GridToolbarFilterButton,
  //   useGridApiContext,
  //   useGridRootProps,
  // } from '@mui/x-data-grid-pro';
  // import { useDemoData } from '@mui/x-data-grid-generator';
//שייך לזה שמאפשר פתיחה 
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function OneDestination({x}){
  //⏲ תחילת הקשר ללוח זמנים
  // const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 7,
  //   maxColumns: 4,
  // });

  // const [savedState, setSavedState] = React.useState({
  //   count: 0,
  //   initialState: data.initialState,
  // });

  // const syncState = React.useCallback((newInitialState) => {
  //   setSavedState((prev) => ({
  //     ...prev,
  //     count: prev.count + 1,
  //     initialState: newInitialState,
  //   }));
  // }, []);
  //⏲ סוף הקשר ללוח זמנים


  let attractionTypes = useSelector(state=> state.attraction.attractionTypes);
  let countries = useSelector(state=> state.attraction.countries);
  let person = useSelector(state=> state.attraction.person);

  let xattractionTypes = attractionTypes.find(item=> item.Id == x.TypeId)
  let xcountries = countries.find(item=> item.Id == x.CountryId)
  let xperson = person.find(item=> item.Id == x.PersonId) 

  let mynavigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(()=>{
    console.log("ddd", person[0].Person) 

  },[])
  let user = useSelector(state => state.user.currentUser)
    return(<>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={x.Img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { x.Name}
            {/* {user.UserTypeId == 2 ? <input type="text" className='x' value={x.Name}/> : x.Name} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {x.Desc+" "+xattractionTypes.Type +" "+ xcountries.Country+" "+xperson.Person }
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>


      <CardActions disableSpacing>
      <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/"+x.Id)}/></IconButton></Tooltip>
      
      <Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more">     
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>

    {/* נפתח רק בעת לחיצת הכפתור */}
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>


      {/* <Stack spacing={2} sx={{ width: '100%' }}>
      <Box sx={{ height: 300 }}>
        <DataGridPro
          {...data}
          loading={loading}
          initialState={savedState.initialState}
          key={savedState.count}
        />
      </Box>
    </Stack> */}
    {/* <CardActions disableSpacing>
    <Typography paragraph>
    <Link href="#" sx={{fontSize: 20}} >Link</Link>

          </Typography>
      
       <Typography paragraph>
            Heat 1/2 cup of the broth 

          </Typography>
         </CardActions> */}
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <Link href="#" sx={{fontSize: 20}} >Link</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
         
        </Typography>
      </CardContent>


      </CardContent>
    </Collapse>



    </Card>
    </>)
}  
