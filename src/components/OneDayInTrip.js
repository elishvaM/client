import * as React from 'react';
import { useSelector } from "react-redux";
import { Autocomplete } from "@mui/material";
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import Stack from '@mui/material/Stack';
export default function OneDayInTrip({ oneDay, attractionsDay, dayinWeek }) {
  let [choosenAttraction, setChoosenAttraction] = React.useState([]);
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
        title={[moment(oneDay).format('DD/MM/YYYY')]}
        subheader={dayinWeek}
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
              />
            )}
          />
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          אטרקציות
          {console.log("c att",choosenAttraction)}
          {choosenAttraction.length === 0 ? <span>הוסף אטרקציות ליום זה</span> :
            choosenAttraction.map(x => <>{x.name}</>)
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="שתף">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  </>
}