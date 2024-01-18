import * as React from 'react';
import { useEffect } from "react"
import { getAllProductsByTripListId } from "../services/item";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { GridRowModes } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from "@mui/joy/Checkbox";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AddIcon from '@mui/icons-material/Add';
import AddItem from './AddItem';
import { Button } from '@mui/base';
import { height } from '@mui/system';
import ItemsOptions from './ItemsOptions';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export function UserList(){
    const { tripId } = useParams();
    const [selectedProducts, SetSelectedProducts]= React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [openAddItem, setOpenAddItem] = React.useState(false);
const columns = [
  { field: 'id', headerName: 'מספר', width: 150 },
  {
    field: 'key',
    headerName: 'שם הפריט',
    width: 150,
    editable: false,
  },
  {
    field: 'sum',
    headerName: 'כמות',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'storageType',
    headerName: 'סוג אחסון',
    width: 150,
    editable: false,
    valueGetter: params => params.row.product.storageType
  },
  {
    field: 'productType',
    headerName: 'סוג מוצר',
    width: 150,
    editable: false,
    valueGetter: params => params.row.product.productType
  },
  {
    field: 'isNeedAssurants',
    type: "actions",
    headerName: 'צריך ביטוח',
    width: 150,
    editable: false,
    cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            checked={params.row.product.isNeedAssurants ? "checked" : ""}
          />
        ];
      },
  },
  {
    field: "statusId",
    type: "actions",
    headerName: "לקנות / ארוז",
    width: 100,
    cellClassName: "actions",
    getActions: (params) => {
        return [<>
          <Checkbox
            color="success"
            checked={params.row.statusId==1? "checked" : ""}  
            checkedIcon={<DoneRoundedIcon />}
            onClick ={(e)=>changeData(params.row, "statusId" ,!e.target.checked?3:1)}
            // :<DoneRoundedIcon />
          />
            
          <Checkbox
            {...label}
                //icon={<ShoppingCartOutlinedIcon />}
                checked={params.row.statusId==2? "checked" : ""} 
                checkedIcon={<ShoppingCartOutlinedIcon />} 
                onClick ={(e)=>{console.log(e.target.checked);changeData(params.row, "statusId" ,!e.target.checked?3:2)}}
                // :<ShoppingCartIcon />
           />
        </>]
    }
  }
];
const changeData = (rowX, field ,value) => {
    console.log(rowX+" "+ field+" "+value)
    const copyRowes = [...rows];
    const index = copyRowes.findIndex((row) => row.id == rowX.id);
    if (index > -1) {
      copyRowes[index]["edit"] = true;
      copyRowes[index][field] = value;
    }
    setRows(copyRowes);
    //server
  };
    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
        SetSelectedProducts(selectedRowsData);
      };
    useEffect(()=>{
        getAllProductsByTripListId(tripId).then(res=>{
            res.data.map((row, index) => row["id"] = index+1);
            setRows(res.data) 

            console.log(res.data)
            //לשמור פה שינויים 
        }).catch(err=> console.log("err"+err))
    },[])
    return(<>
    {console.log(rows)} 
    {/* <ItemsOptions/>
    <AddIcon color="primary" sx={{
          border: "2px solid rgb(217, 214, 214)",
          position:'relative', top:"5rem",
          width:800,
          height:800,
          borderRadius: 3, padding:70// 0.7
        }} onClick={setOpenAddItem(true)} /> */}
    {openAddItem ? <AddItem setOpenAddItem={setOpenAddItem} /> : null}
    <Box sx={{ height: 400, width: '80%', position:"relative",left:"1rem", top:"7rem" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize:5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </Box>
   </>)
}