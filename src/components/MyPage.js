// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import TreeView from '@mui/lab/TreeView';
// import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
// import Typography from '@mui/material/Typography';
// import MailIcon from '@mui/icons-material/Mail';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Label from '@mui/icons-material/Label';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import InfoIcon from '@mui/icons-material/Info';
// import ForumIcon from '@mui/icons-material/Forum';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import AttractionsIcon from '@mui/icons-material/Attractions';
// import { useNavigate } from 'react-router-dom';
// const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
//   color: theme.palette.text.secondary,
//   [`& .${treeItemClasses.content}`]: {
//     color: theme.palette.text.secondary,
//     borderTopRightRadius: theme.spacing(2),
//     borderBottomRightRadius: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     fontWeight: theme.typography.fontWeightMedium,
//     '&.Mui-expanded': {
//       fontWeight: theme.typography.fontWeightRegular,
//     },
//     '&:hover': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
//       backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
//       color: 'var(--tree-view-color)',
//     },
//     [`& .${treeItemClasses.label}`]: {
//       fontWeight: 'inherit',
//       color: 'inherit',
//     },
//   },
//   [`& .${treeItemClasses.group}`]: {
//     marginLeft: 0,
//     [`& .${treeItemClasses.content}`]: {
//       paddingLeft: theme.spacing(2),
//     },
//   },
// }));

// function StyledTreeItem(props) {
//   const theme = useTheme();
//   const {
//     bgColor,
//     color,
//     labelIcon: LabelIcon,
//     labelInfo,
//     labelText,
//     colorForDarkMode,
//     bgColorForDarkMode,
//     ...other
//   } = props;

//   const styleProps = {
//     '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
//     '--tree-view-bg-color':
//       theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
//   };

//   return (
//     <StyledTreeItemRoot
//       label={
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             p: 0.5,
//             pr: 0,
//           }}
//         >
//           <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
//           <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </Box>
//       }
//       style={styleProps}
//       {...other}
//     />
//   );
// }

// StyledTreeItem.propTypes = {
//   bgColor: PropTypes.string,
//   bgColorForDarkMode: PropTypes.string,
//   color: PropTypes.string,
//   colorForDarkMode: PropTypes.string,
//   labelIcon: PropTypes.elementType.isRequired,
//   labelInfo: PropTypes.string,
//   labelText: PropTypes.string.isRequired,
// };

// export default function GmailTreeView() {
//   let mynavigate = useNavigate();
//   return (
//     <TreeView
//       aria-label="gmail"
//       defaultExpanded={['3']}
//       defaultCollapseIcon={<ArrowDropDownIcon />}
//       defaultExpandIcon={<ArrowRightIcon />}
//       defaultEndIcon={<div style={{ width: 24 }} />}
//       sx={{ height: 300, flexGrow: 1, width: 400, position:"absolute", right:"2rem" }}
//     >
//       {/* , overflowY: 'auto', maxWidth: 400 זה עשה לי גלגלת ?? */}
//       <StyledTreeItem nodeId="1" labelText="האטרקציות שאהבתי" labelIcon={AttractionsIcon}
//                       onClick={()=>mynavigate("/lovedattractions")}/>
//       <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
//       <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
//         <StyledTreeItem
//           nodeId="5"
//           labelText="Social"
//           labelIcon={SupervisorAccountIcon}
//           labelInfo="90"
//           color="#1a73e8"
//           bgColor="#e8f0fe"
//           colorForDarkMode="#B8E7FB"
//           bgColorForDarkMode="#071318"
//         />
//         <StyledTreeItem
//           nodeId="6"
//           labelText="Updates"
//           labelIcon={InfoIcon}
//           labelInfo="2,294"
//           color="#e3742f"
//           bgColor="#fcefe3"
//           colorForDarkMode="#FFE2B7"
//           bgColorForDarkMode="#191207"
//         />
//         <StyledTreeItem
//           nodeId="7"
//           labelText="Forums"
//           labelIcon={ForumIcon}
//           labelInfo="3,566"
//           color="#a250f5"
//           bgColor="#f3e8fd"
//           colorForDarkMode="#D9B8FB"
//           bgColorForDarkMode="#100719"
//         />
//         <StyledTreeItem
//           nodeId="8"
//           labelText="Promotions"
//           labelIcon={LocalOfferIcon}
//           labelInfo="733"
//           color="#3c8039"
//           bgColor="#e6f4ea"
//           colorForDarkMode="#CCE8CD"
//           bgColorForDarkMode="#0C130D"
//         />
//       </StyledTreeItem>
//       <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
//     </TreeView>
//   );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
//import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import LuggageIcon from '@mui/icons-material/Luggage';
import AddBigList from './AddBigList';
import { useEffect } from 'react';
// import { set } from 'react-hook-form';
// import LovedAttractions from './LovedAttractions';
import { GetAllTripListsByUserIdFromServer } from '../services/list';
import { useSelector } from 'react-redux';
import { saveTripList } from '../store/actions/list';
import { useDispatch } from 'react-redux';
const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user.currentUser);
  const [data,setData] = React.useState([]);
  useEffect(() => {
    GetAllTripListsByUserIdFromServer(user.id).then(res => {
      dispatch(saveTripList(res.data))
      console.log("trip:", res.data)
    // שליםה משרת כל הליסטים של המשתמש למשתנה דטה
      setData(res.data);
    })
  }, [user]);
  const [openCreateTrip, setOpenCreateTrip] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  let mynavigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex', position: "absolute", right: "1rem", height: 500 }}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 300)' },
              background: { paper: 'rgb(5, 30, 52)' },
            },
          })}
        >
          <Paper elevation={0} sx={{ maxWidth: 256, borderRadius: "0px 4px 4px 4px" }}>
            <FireNav component="nav" disablePadding>
              <ListItemButton component="a" href="#customized-list">
                <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="האיזור האישי"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
              <Divider />
              <ListItem component="div" disablePadding>
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemIcon>
                    <Home color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Overview"
                    primaryTypographyProps={{
                      color: 'primary',
                      fontWeight: 'medium',
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
                <Tooltip title="Project Settings">
                  <IconButton
                    size="large"
                    sx={{
                      '& svg': {
                        color: 'rgba(255,255,255,0.8)',
                        transition: '0.2s',
                        transform: 'translateX(0) rotate(0)',
                      },
                      '&:hover, &:focus': {
                        bgcolor: 'unset',
                        '& svg:first-of-type': {
                          transform: 'translateX(-4px) rotate(-20deg)',
                        },
                        '& svg:last-of-type': {
                          right: 0,
                          opacity: 1,
                        },
                      },
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        height: '80%',
                        display: 'block',
                        left: 0,
                        width: '1px',
                        bgcolor: 'divider',
                      },
                    }}
                  >
                    <Settings />
                    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />
              <Box
                sx={{
                  bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                  pb: open ? 2 : 0,
                }}
              >
                {/* loved attraction  */}
                <ListItemButton
                  alignItems="flex-start"
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,//?? open was removed 
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="אטרקציות שאהבתי"
                    onClick={() => mynavigate('love')}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                    secondary="אטרקציות שסומנו"
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => setOpen(!open)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                  }}
                >
                  <ListItemText
                    primary="הטיולים שלי"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                      mb: '2px',
                    }}
                    secondary= {data.map(x=> ","+x.name)} 
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {console.log("data", data)}
                {open &&
                  data.map((item) => (
                    <ListItemButton
                      key={item.name}
                      sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                      onClick={() => { mynavigate(`mytrip/${item.id}`); console.log("mytrip/:",{item}) }}
                    >
                      <ListItemIcon sx={{ color: 'inherit' }}>
                       
                       :)

                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                      />
                    </ListItemButton>
                  ))
                }
                <ListItemButton
                  sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)', marginTop: 5 }}
                  onClick={() => { setOpenCreateTrip(true) }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="הוסף טיול חדש"
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                  />
                </ListItemButton>
                {openCreateTrip ? <AddBigList setOpen={setOpenCreateTrip}
                  open={openCreateTrip} data={data} setData={setData} />
                  : null}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
      <Outlet />
      {/* <div> {directChose==="LovedAttractions"? <LovedAttractions/>:
    ///??? האם נכון כך להמשיך עבור כל האופציות שבאזור האישי
          //  directChose=== //
             null}
    </div> */}

    </>
  );
}


