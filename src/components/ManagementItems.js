import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useDispatch, useSelector } from "react-redux";
import {
  addManyItems,
  removeItem,
  saveItems,
  saveProductTypes,
  saveStorageTypes,
} from "../store/actions/item";
import {
  AddListAttractionListProductFromServer,
  GetAllStorageTypesFromServer,
  getAllProductTypes,
  getAllProducts,
} from "../services/item";
import Checkbox from "@mui/joy/Checkbox";
import Close from "@mui/icons-material/Close";
import AddItem from "./AddItem";
import {updateItem} from "../store/actions/item";
import {updateProductFromServer,DeleteProductFromServer,AddProductFromServer} from '../services/item';
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
export default function ManagementItems() {
  const storageTypes = useSelector((s) => s.item.storageTypes);
  const productTypes = useSelector((s) => s.item.productTypes);
  const products = useSelector((s) => s.item.allitems);
  const dispatch = useDispatch();
  React.useEffect(() => {
    {
      products.length > 0
        ? setRows(products)
        : getAllProducts()
            .then((res) => {
              res.data.map((row, index) => row["idRow"] = index+1);
              setRows(res.data);
              dispatch(saveItems(res.data));
            })
            .catch((e) => console.log(e));
    }
    {
      storageTypes.length == 0 &&
        GetAllStorageTypesFromServer()
          .then((res) => {
            console.log(res.data);
            dispatch(saveStorageTypes(res.data));
          })
          .catch((e) => console.log(e));
    }
    {
      productTypes.length == 0 &&
        getAllProductTypes()
          .then((res) => {
            dispatch(saveProductTypes(res.data));
          })
          .catch((e) => console.log(e));
    }
  }, []);
  const [rows, setRows] = React.useState([...products]);
  const [file, setFile] = React.useState();
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    DeleteProductFromServer(id).then(res=> 
      {console.log(res.data); dispatch(removeItem(id))}).catch(err=> console.log("err"+ err))
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };



  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const [tempRows, setTempRow] = useState([]);
  const processRowUpdate = (newRow) => {
    //my update start
    const updatedItem ={
      id: newRow.id,
      isDuplicated: newRow.isDuplicated,
      productTypeId: productTypes.find(i=> i.type == newRow.productType).id,
      storageTypeId: storageTypes.find(i=> i.type == newRow.storageType).id,
      isNeedAssurants: newRow.isNeedAssurants,
      img: newRow.img,
      isImgConfirm: newRow.isImgConfirm,
      isConfirm: newRow.isConfirm,   
      name: newRow.name,
      status:newRow.status
    }
    console.log(updatedItem)
    updateProductFromServer(updatedItem).then(res=>
      {console.log(res.data)
      dispatch(updateItem(updatedItem))}
      )
    .catch(err=> console.log("err"+err))
    //my update start
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  
  const changeData = (x, y) => {
    const id = x.id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // handleEditClick(x.id)  two up lines is instead call this function
    const copyRowes = [...rows];
    const index = copyRowes.findIndex((row) => row.id == x.id);
    if (index > -1) {
      copyRowes[index]["edit"] = true;
      copyRowes[index][y] = !copyRowes[index][y];
    }
    setRows(copyRowes);
  };
  const columns = [
    { field: "idRow", headerName:"מספר" },
    {
      field: "img",
      headerName: "תמונה",
      width: 110,
      renderCell: (params)=>{
        return (
          <div>
            <input
              accept={file}
              style={{ display: "none" }}
              id={rows[params.row.idRow-1].id}
              onChange={(e) => {
                const id = e.target.id;
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
                // handleEditClick(x.id);  two up lines is instead call this function
                const copyRowes = [...rows];
                const index = copyRowes.findIndex((row) => row.id == e.target.id);
                if (index > -1) {
                  copyRowes[index]["edit"] = true;
                  copyRowes[index]["img"] = URL.createObjectURL(e.target.files[0]);
                }
                setRows(copyRowes);          
              }}
              multiple
              type="file"
/>            <label htmlFor={rows[params.row.idRow-1].id}>
            <img src={params.row.img}  width={70} height={62}alt='' component="span"/></label>
           </div>
        )
      } 
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
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: storageTypes.map((x) => x.type),
    },
    {
      field: "productType",
      headerName: "סוג מוצר",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: productTypes.map((x) => x.type),
    },
    {
      field: "isNeedAssurants",
      type: "actions",
      headerName: "צריך ביטוח",
      width: 150,
      editable: false,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            onClick={() => changeData(params.row, "isNeedAssurants")}
            checked={params.row.isNeedAssurants ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "isDuplicated",
      type: "actions",
      headerName: "האם מוכפל",
      width: 150,
      editable: false, 
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            onClick={() => changeData(params.row, "isDuplicated")}
            checked={params.row.isDuplicated ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "isConfirm",
      type: "actions",
      headerName: "האם מאושר",
      width: 150,
      editable: false, 
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            onClick={() => {
              changeData(params.row, "isConfirm");
            }}
            checked={params.row.isConfirm ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "מחק / ערוך",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
    {/* {console.log(products)} */}
      {console.log(rows)}
      {/* <AddItem/>  */}
      <Box
        sx={{
          height: 520,
          width: "95%",
          margin: "auto",
          marginTop:10,
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={62}
          editMode="row"
          rowModesModel={rowModesModel}

          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}

          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
}
