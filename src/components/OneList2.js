import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'NAME',
    width: 150,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'COMMENT',
    width: 150,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'AMOUNT',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'image',
    headerName: 'IMAGE',
    width: 110,
    editable: false,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 1, name: 'קרם', comment: 'לקנות', amount: 1, image:"/imgs/items/Hair Brush.jpg" },
  { id: 2, name: 'בקבוק', comment: 'להקפיא', amount: 3, image:"/imgs/items/Hair Brush.jpg"},
  { id: 3, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg"},
  { id: 4, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg"},
  { id: 5, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg" },
  { id: 6, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg" },
  { id: 7, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg" },
  { id: 8, name: 'כובע', comment: 'לכבס אותו', amount: 1, image:"/imgs/items/Hair Brush.jpg" },
];
export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%', position:"relative",left:"20rem", top:"7rem" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}