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
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Stack from '@mui/material/Stack';
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
export default function OneDayInTrip({ oneDay, attractionsDay, dayinWeek }) {
  const [expanded, setExpanded] = React.useState(false);
  let [choosenAttraction, setChoosenAttraction] = React.useState([]);
  //הצגת תאריך ככותרת

  const lovedattractions = useSelector(state => state.attraction.attractions.filter(x => x.isLoved));
  lovedattractions.map(x => { x.label = x.name });
  return <>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            1
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dayinWeek}
        subheader={[moment(oneDay).format('DD/MM/YYYY')]}
      // {oneDay.getDate().format("MM/DD/YYYY")}
      />
      <CardMedia>
        {/* // component="img"
        // height="194"
        // image="/static/images/cards/paella.jpg"
        // alt="Paella dish" */}
        <Stack spacing={3} >
          <Autocomplete
            multiple
            id="tags-outlined"
            options={lovedattractions}
            getOptionLabel={(option) => option.name}
            //  defaultValue={[top100Films[13]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="הוסף אטרקציות ליום"
                placeholder="בחר"
                {...setChoosenAttraction(params)}
                // {...console.log("att", params)}
              />
            )}
          />
        </Stack>
      </CardMedia>
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
          <Typography paragraph>אטרקציות:</Typography>
          <Typography paragraph>
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
  </>
}