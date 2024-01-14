import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addManyItems } from '../store/actions/item';
import { AddListAttractionListProductFromServer } from '../services/item';
const columns = [
  { field: 'id', headerName: 'מספר', width: 150 },
  {
    field: 'name',
    headerName: 'שם הפריט',
    width: 150,
    editable: false,
    valueGetter: params => params.row.product.name
  },
  {
    field: 'amount',
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
    headerName: 'צריך ביטוח',
    width: 150,
    editable: false,
    valueGetter: params => params.row.product.isNeedAssurants
  }
];
export default function EditedList(){
    const { state } = useLocation();
    const [rows, setRows] = React.useState([]);
    const id = useSelector(s=>s.list.currentAttractionListId);
    const existProducts = useSelector(s=>s.item.itemsSelected);
    const dispatch = useDispatch();
    React.useEffect(()=>{ 
        setRows(state.attractionListProduct) 
    },[state])

    const [selectedProducts, SetSelectedProducts]= React.useState([]);
    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
        SetSelectedProducts(selectedRowsData);
      };
    const addtomylist = () =>{
        //dispatch(copyItems(selectedProducts, id))
         //מחיקת הפריטים שרוצה להוסיף מרשימה קיימת כי כבר קיימים אצלו
         const a = selectedProducts.filter(item => 
          (existProducts.map(existProducts => existProducts.productId)
          .includes(item.productId))? false : true );
      if(a.length>0){
        console.log("selectedProducts",a)
          //כדי לשלוח לשרת מתאימה את השדות ...    
          const b = a.map(i => ({...i, product:null, id:0, status:null, attractionListId:id}) ); 
       console.log("bbb",b)   
          AddListAttractionListProductFromServer(b).then(res=>{
                //עוברת על סלקטדפרודקטס כי יש להם את אוביקט פרודקט שלא קבלתי מהשרת
               const c = a.map((i, key)=> ({...i,id:res.data[key].id}))
               dispatch(addManyItems(c))
          }).catch(err=>"err " + err)
      }
    }
    return (<>
    {state.attractionListProduct.map(i=><img key={i.id} src={i.product.img} style={{height:100, width:100}}/>)}
    {selectedProducts.length>0?<input type="button" value="העבר אלי" onClick={addtomylist}/>:null}
    <Box sx={{ height: 400, width: '70%', position:"relative",left:"1rem", top:"7rem" }}>
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

