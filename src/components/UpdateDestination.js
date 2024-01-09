import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Input from '@mui/material/Input';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";
//select start
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';//switch
import Switch from '@mui/material/Switch';//switch
// import Stack from "@mui/material/Stack";
import "../StyleComponents/AddItem.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
//select end
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const schema = yup.object({
    Name: yup.string().required("שדה חובה").test('len', "אורך בין 2-50", x => x.length >= 2 && x.length <= 50),
    Desc: yup.string().required("שדה חובה").test('len', "אורך בין 10-4000", x => x.length >= 10 && x.length <= 4000),
    //PersonStateId: yup.string().test('required', "חובה לבחור התאמה",function(){ return arrSelect[1].select!="" }),
}).required();
export default function UpdateDestination({setEditAtt, editAtt, attraction}){
    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema)
    });
    let [isConfirm, setIsConfirm] = React.useState(true);

    const attractionTypes = [  {id:1, type:"יבש"},{id:2, type:"אקסטרים"},{id:3, type:"רטוב"}];
    const person = [{id:1, person:"ילדים"},{id:2, person:"נוער"},{id:3, person:"מבוגרים"}];// {Id:4, Person:"הכל"},//];
    //select start
    let [arrSelect, setArrSelect] = React.useState(
        [{list:attractionTypes, title:"סוג", select:"", fieldName:"type"},{list:person, title:"התאמת גיל", select:"", fieldName:"person"} ]);
    const handleChange = (event) => {
        console.log(event.target.value)
      let copy = [...arrSelect];
      copy[event.target.name].select = event.target.value;
      console.log("fdddd");
      console.log(copy);
      setArrSelect(copy);
    };
    //select end
    const update = () =>{
        // let updateAtt = {IsConfirm:isConfirm, PersonStateId:arrSelect[0].select, TypeId:arrSelect[1].select}
        setEditAtt(!editAtt);
    }
    const ariaLabel = { 'aria-label': 'description' };
    return(<><form onSubmit={handleSubmit(update)}>
      <Card className="card" >
        
        <CardActionArea>
          <div className="photo-erea">
            <CardMedia
              sx={{ height: 100 }}
              image={`/imgs/att/${attraction.img}`}
              title={attraction.name} />
          </div>
          <CardContent className="content">
            <Input  placeholder="שם הפריט" defaultValue={attraction.name}
                inputProps={ariaLabel} 
                /> 
            <Input  placeholder="שם הפריט" defaultValue={attraction.desc}
                inputProps={ariaLabel} 
                /> 
                <TextField id="outlined-basic" label="שם" variant="outlined"   {...register("Name")} />
                            <div className="error">{errors.Name?.message}</div>
                <TextField id="outlined-basic" label="תאור" variant="outlined"  {...register("Desc")} />
                            <div className="error">{errors.Desc?.message}</div>
        
        {arrSelect.map((x, index)=>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 160 }}                >
        <InputLabel
        id="demo-simple-select-filled-label">{x.title}</InputLabel>

        <Select
          labelId="demo-simple-select-filled-label"
          id="personState"
          name={index}
          value={x.select}
          onChange={handleChange}
          {...register("PersonStateId")}
        >
          {/* <MenuItem value="">
            <em>אף לא אחד</em>
          </MenuItem> */}
           {x.list.map(i => <MenuItem value={i.id}>{i[x.fieldName]}</MenuItem>)}
          
        </Select>
      </FormControl>)}
      <div className="error">{errors.PersonStateId?.message}</div>

      <FormControlLabel
              sx={{ position: "absolute", right: "1.8rem", direction:"ltr" }}
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              onChange={() => setIsConfirm(!isConfirm)}
              label={
                isConfirm ? "האטרקציה מאושרת": "האטרקציה אינה מאושרת"
              }
              labelPlacement="start"
            />
          </CardContent>
          <IconButton aria-label="add to favorites" > 
            <FavoriteIcon color={attraction.isLoved ? "error" : "none"} />
          </IconButton>

          <Tooltip title="שמור"><IconButton sx={{position:'absolute', left:0}} type="submit"
          // onClick={()=>{ update() }}
            >
            <SaveAsIcon /></IconButton></Tooltip>
           
        </CardActionArea>
      </Card> </form>
    </>
    )
}