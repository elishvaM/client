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
  const [openFile, setOpenFile] = React.useState(false);
  const [rows, setRows] = React.useState([...products]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  let [file, setFile] = useState();
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
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

  const changeData = (x, y) => {
    const copyRowes = [...rows];
    const index = copyRowes.findIndex((row) => row.id == x.id);
    if (index > -1) {
      copyRowes[index]["edit"] = true;
      copyRowes[index][y] = !copyRowes[index][y];
    }
    setRows(copyRowes);
    //
  };

  const columns = [
    { field: "id", headerName: "מספר" },
    {
      field: "img",
      headerName: "תמונה",
      width: 110,
      editable: function (rowData) {
        return rowData.userId == 0 ? true : false;
      },
      renderCell: (params) => {
        return (
          <>
            {/* <input type="file" /> */}
            {/* <input type="file" /> */}

            <input
              accept={file}
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <img
                src={file?file:params.row.img}
                alt=""
                width={70}
                height={62}
                component="span"
                onChange={(e) => {
                  console.log(e);
                  setFile(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </label>

            {/*                 
              <Button label="בחר תמונה" component="span"
                onChange={(e) => {
                  console.log(e)
                  setFile(URL.createObjectURL(e.target.files[0]))
                }} /> */}

            {/* <img src={file} style={{ width: 70, height: 70 }} /> */}

            {/* {openFile ? (
              <>
                <input type="file" />
              </>
            ) : (
              <button onclick={() => setOpenFile(true)}>
                <img src={} alt="" width={70} height={62} />
              </button>
            )} */}
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "שם הפריט",
      width: 150,
      editable: function (rowData) {
        return rowData.userId == 0 ? true : false;
      },
    },
    {
      field: "storageType",
      headerName: "סוג אחסון",
      width: 100,
      editable: function (rowData) {
        return rowData.userId == 0 ? true : false;
      },
      type: "singleSelect",
      valueOptions: storageTypes.map((x) => x.type),
    },
    {
      field: "productType",
      headerName: "סוג מוצר",
      width: 100,
      editable: function (rowData) {
        return rowData.userId == 0 ? true : false;
      },
      type: "singleSelect",
      valueOptions: productTypes.map((x) => x.type),
    },
    {
      field: "isNeedAssurants",
      type: "actions",
      headerName: "צריך ביטוח",
      width: 150,
      editable: false, // function(rowData) {return rowData.userId == 0?true:false;},
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            defaultChecked
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
      editable: false, // function(rowData) {return rowData.userId == 0?true:false;},
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            defaultChecked
            onClick={() => changeData(params.row, "isDuplicated")}
            checked={params.row.isDuplicated ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "isImgConfirm",
      type: "actions",
      headerName: "האם תמונה מאושרת",
      width: 150,
      editable: false, // function(rowData) {return rowData.userId == 0?true:false;},
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            defaultChecked
            onClick={() => {
              changeData(params.row, "isImgConfirm");
            }}
            checked={params.row.isImgConfirm ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "isConfirm",
      type: "actions",
      headerName: "האם מאושר",
      width: 150,
      editable: false, // function(rowData) {return rowData.userId == 0?true:false;},
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Checkbox
            color="success"
            defaultChecked
            onClick={() => {
              changeData(params.row, "isConfirm");
            }}
            checked={params.row.isConfirm ? "checked" : ""}
          />,
        ];
      },
    },
    {
      field: "actions",
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
      {console.log(rows)}
      <Box
        sx={{
          height: 550,
          width: "95%",
          margin: "auto",
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
          // onRowModesModelChange={handleRowModesModelChange}
          // onRowEditStop={handleRowEditStop}
          // processRowUpdate={processRowUpdate}
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
