import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addManyItems, saveItems, saveProductTypes, saveStorageTypes } from "../store/actions/item";
import { AddListAttractionListProductFromServer, GetAllStorageTypesFromServer, getAllProductTypes, getAllProducts } from "../services/item";


export default function Manage() {
    const storageTypes = useSelector(s=>s.item.storageTypes);
    const productTypes = useSelector(s=>s.item.productTypes);
    const paymentOptions = [
        { type: "מוצל", label: "w" },
        { type: "קרור", label: "q" },
    ];
    const columns = [
        { field: "id", headerName: "מספר", width: 70 },
        {
          field: "img",
          headerName: "תמונה",
          width: 110,
          renderCell: (params) => {
            return (
              <div>
                <img src={params.row.img} alt="" width={60} height={40}/>
                {/* {params.row.username} */}
              </div>
            );
          },
        },
        {
          field: "name",
          headerName: "שם הפריט",
          width: 150,
          editable: true,
        },
        {
          field: "storageType",
          headerName: "סוג אחסון",
          width: 150,
          editable: true,
          type: 'singleSelect',
            //valueOptions: storageTypes,
            //   valueFormatter: ({ id, value, field }) => {
            //       const option = storageTypes.find(
            //         // x=>x.type == value
            //           ({ type: optionValue }) => optionValue === value
            //       );
      
            //       return option;
            //   },
           // valueGetter: params => params.row.storageType,
              valueOptions: storageTypes.map(x => x.type),
              valueFormatter: ({ id, value, field },params) => {
                console.log(params)
                  const option = storageTypes.find(
                    x=> x.type === value
                      //({ type: optionValue }) => optionValue === value
                  );
                  //const v = option==undefined?valueGetter: params => params.row.storageType;
                  return option.type;
              },
              
        },
        {
          field: "productType",
          headerName: "סוג מוצר",
          width: 150,
          editable: false,
        },
        {
          field: "isNeedAssurants",
          headerName: "צריך ביטוח",
          width: 150,
          editable: true,
          valueGetter: params => params.row.isNeedAssurants?"✔️":"❌"
        },
        {
          field: "isDuplicated",
          headerName: "האם מוכפל",
          width: 150,
          editable: true,
          valueGetter: params => params.row.isDuplicated?"✔️":"❌"
        },
        {
          field: "isConfirm",
          headerName: "האם מאושר",
          width: 150,
          editable: true,
          valueGetter: params => params.row.isConfirm?"✔️":"❌"
        },
        {
          field: "isImgConfirm",
          headerName: "האם תמונה מאושרת",
          width: 150,
          editable: true,
          valueGetter: params => params.row.isImgConfirm?"✔️":"❌"
        },
        
      ];
  const [rows, setRows] = React.useState([]);
  const products = useSelector((s) => s.item.allitems);
  const dispatch = useDispatch();
  React.useEffect(() => {
    {products.length>0?setRows(products):getAllProducts().then(res=>
         {setRows(res.data); dispatch(saveItems(res.data));}
        ).catch(e=>console.log(e))}
    {storageTypes.length==0&&GetAllStorageTypesFromServer().then(res=>
        {console.log(res.data);dispatch(saveStorageTypes(res.data))}
        ).catch(e=>console.log(e))}
    {productTypes.length==0&&getAllProductTypes().then(res=>
            {dispatch(saveProductTypes(res.data))}
            ).catch(e=>console.log(e))}
  }, []);

  const [selectedProducts, SetSelectedProducts] = React.useState([]);
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    console.log(selectedRowsData);
    SetSelectedProducts(selectedRowsData);
  };

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: "95%",
          position: "relative",
          left: "1rem",
          top: "7rem",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={60}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[rows.length/7+1]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </Box>
    </>
  );
}