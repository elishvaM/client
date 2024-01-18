import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addManyItems, deleteManyItemsFromMyList } from '../store/actions/item';
import { AddListAttractionListProductFromServer, GetAttractionListProductByAttractionListId,  } from '../services/item';
import Checkbox from "@mui/joy/Checkbox";
import { saveItemsSelected } from '../store/actions/item';
const columns = [
  { field: 'idRow', headerName: 'מספר', width: 50 },
  { field: "img",
    headerName: "תמונה",
    width: 100,
    renderCell: (params)=>{
    return (
        <img src={params.row.product.img} width={70} height={62}alt='' component="span"/>
    )
  } 
},
  {
    field: 'name',
    headerName: 'שם הפריט',
    width: 100,
    editable: false,
    valueGetter: params => params.row.product.name
  },
  {
    field: 'amount',
    headerName: 'כמות',
    type: 'number',
    width: 100,
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
    headerName: 'צריך ביטוח',
    type: "actions",
    width: 150,
    editable: false, 
    cellClassName: "actions",
    getActions: (params) => {
      return [
        <Checkbox
          color="success"
          checked={params.row.isDuplicated ? "checked" : ""}
        />
      ];
    },
  },
];
export default function UserAttractionList(){
    const [rows, setRows] = React.useState([]);
    const [selectedProducts, SetSelectedProducts]= React.useState([]);
    const id = useSelector(s=>s.list.currentAttractionListId)
    const dispatch = useDispatch();
    React.useEffect(()=>{
      GetAttractionListProductByAttractionListId(id).then(res => {
        console.log("fuul product to my attraction list")
        console.log(res.data)
        dispatch(saveItemsSelected(res.data))
        res.data?.map((row, index) => row["idRow"] = index+1);
        setRows(res.data) 
      }).catch(error => { console.log(error) })

    },[])
    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids?.map((id) => rows.find((row) => row.id === id));//דוחף למשתנה את כל השורות שסומנו
        console.log("selectedRowsData",selectedRowsData);
        SetSelectedProducts(selectedRowsData);
      };
      const deleteFromMyList=()=>{
        const filter = rows.filter(x=>
          (selectedProducts.map(d=>d.id).includes(x.id)?false:true)) 
        dispatch(deleteManyItemsFromMyList(filter))
        setRows(filter)
      }
    return (<>
    <button onClick={deleteFromMyList}>מחק</button>
    <Box sx={{ height: 400, width: '70%', position:"relative",left:"1rem", top:"16rem" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        height={500}
        rowHeight={70}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize:5,
            },
          },
        }}
        pageSizeOptions={[4]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </Box>
    </>)
}

