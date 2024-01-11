import HomeIcon from '@mui/icons-material/Home';
import { tooltipClasses } from "@mui/material/Tooltip";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserLocation } from '../store/actions/user';
export function NavBarPersonalArea(){
    const mynavigate = useNavigate();
    const dispatch = useDispatch();
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
          boxShadow: theme.shadows[1],
          fontSize: 13,
        },
      }));
    return (<>
     <LightTooltip title="חזור לדף הבית">
                  <Button size="large"  sx={{
                  position:"absolute", left:'1rem'}}>
                  
                    <HomeIcon sx={{fontSize: 40, color:"crimson"}} 
                     onClick={()=>{dispatch(changeUserLocation(false)); mynavigate("/")}}/>
                  </Button>
                </LightTooltip>
    </>)
}