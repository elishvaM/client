import * as React from 'react';
import { useSelector } from "react-redux";
import { Autocomplete } from "@mui/material";
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
export default function OneDayInTrip({ date, attractionsDay, dayinWeek }) {
  const [expanded, setExpanded] = React.useState(false);
  //הצגת תאריך ככותרת

  const lovedattractions = useSelector(state => state.attraction.attractions.filter(x => x.isLoved));
  lovedattractions.map(x => { x.label = x.name });
  return <>

<Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dayinWeek+" "+date}
        subheader=""
      />
      <CardMedia
        component="img"
        height="194"
        image="/imgs/product23_image1_2021-03-29_11-25-56.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          אטרקציות
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="שתף">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > */}
        {/* <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph
          >אטרקציות:
          </Typography>
          <Typography paragraph>
           
          </Typography>
        </CardContent>
      </Collapse>
      {attractionsDay?.map(attraction => <h5>{attraction.attractionId}{console.log(attraction.attractionId)}</h5> )}

    </Card>
  
    {/* Autocomplete */}
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={lovedattractions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Attraction" />}
    />
  </>
}