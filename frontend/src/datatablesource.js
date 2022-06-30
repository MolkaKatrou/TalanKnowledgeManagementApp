import { Avatar, ChakraProvider } from "@chakra-ui/react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Chip } from "@mui/material";
import { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { getAllCategories } from "./Redux/Actions/categoryAction";


export const userColumns = [
  {
    field: "fullname",
    headerName: "Collaborator",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <ChakraProvider>
            <Avatar src={params.row.pic} name={params.row.fullname}  size='sm'></Avatar>
          </ChakraProvider> 
          <div className="mx-3">{params.row.fullname}</div>       
          
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 90,
  },

  {
    field: "occupation",
    headerName: "Occupation",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.occupation}`}>
          {params.row.occupation}
        </div>
      );
    },
  },

  {
    field: "isVerified",
    headerName: "Status",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus`} style={{marginLeft:'-6px'}} >
          {params.row.isVerified ? 
          <div className="active">Verified</div> : 
          <div className="pending" >Pending</div> }
        </div>
      );
    },
  },

  {
    field: "role",
    headerName: "IS ADMIN",
    width: 90,
    renderCell: (params) => {
      return (
        <div className='mx-4'>
          {params.row.role === 'ADMIN' ? <CheckIcon/> : <CloseIcon/> }
        </div>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Created On",
    width: 120,
    renderCell: (params) => {
        return (
            <div className={`cellWithStatus ${params.row.createdAt}`}>

                <Moment format="YYYY/MM/DD">
                    {params.row.createdAt}
                </Moment>

            </div>
        );
    },
},
];

export const categoryColumns = [
  {
    field: "name",
    headerName: "Category Name",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg"> 
          <div className="mx-3">{params.row.name}</div>       
    
        </div>
      );
    },
  },
  {
    field: "createdby",
    headerName: "Creator",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <ChakraProvider>
            <Avatar src={params.row.createdby.pic} name={params.row.createdby.fullname}  size='sm'></Avatar>
          </ChakraProvider> 
          <div className="mx-3">{params.row.createdby.fullname}</div>       
          
        </div>
      );
    },
  },
  {
    field: "parentId",
    headerName: "Parent Category",
    width: 230,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.parentId}`}>
          {params.row.parentId}
        </div>
      );
    },
  },

  {
    field: "color",
    headerName: "Color",
    width: 100,
  },
 

 
];

