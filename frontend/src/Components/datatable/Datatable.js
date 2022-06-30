import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import toast from "react-hot-toast";

const Datatable = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const  auth = useSelector(state => state.auth)

  useEffect(async () => {
    await axios.get("/Api/users").then((res) => {
      setUsers(res.data.filter(u=>u._id !== auth.user.id));
    });
  }, [show]);

  const filterContent = (users, searchTerm) => {
    const result = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchTerm) ||
        user.lastname.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.occupation.toLowerCase().includes(searchTerm)
    );
    setUsers(result);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const searchTerm = e.target.value;
    axios.get("/Api/users")
      .then(res => {
        filterContent(res.data.filter(u=>u._id !== auth.user.id), searchTerm);
        console.log(searchTerm)

      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`/Api/users/${id}`)
        .then(res => {
          setShow(!show)
          setTimeout(() => {
            toast.success('The collaborator has been successfully deleted')
            
          }, 2000);
        })
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 187,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={`/users/update/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="UpdateButton">Update</div>
            </Link>
           
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/users/new" className="link">
          Add New Collaborator
        </Link>
        <Paper
          sx={{ p: '1px 1px', display: 'flex', alignItems: 'center', width: 400, bgcolor: 'transparent' }}
          style={{ borderRadius: '18px', border: '1px solid #DDD4D4' }}
          className='Search-admin'
        >
          <IconButton>
            <SearchIcon  className='Search-admin'/>
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search.."
            className='Search-admin'
            onChange={handleSearch}
            inputProps={{ 'aria-label': 'search ' }}
          />

        </Paper>
      </div>
      {users ?
        <DataGrid
          getRowId={(row) => row._id}
          className="datagrid"
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection

        /> :

        <DataGrid
          className="datagrid"
          columns={userColumns.concat(actionColumn)}
          loading='true'
        />
      }
    </div>
  );
};

export default Datatable;
