import React, { useEffect, useState } from "react";
import RowUsers from "../../Components/RowUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../Components/Alert";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Container, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux";


function AdminPanel() {
  const useStyles = makeStyles((theme) => ({
     button: {
      transition: 'all 0.3s ease-out',
      background: 'rgb(20, 60, 87)',
      color: '#fff',
      padding: '16px 25px',
      border: '1px solid ',
      '&:hover': {
        background: 'rgb(0, 45, 80)',
      },     
    },
}));
const auth = useSelector(state => state.auth)
  const classes = useStyles()
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

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
        filterContent(res.data, searchTerm);
        console.log(searchTerm)

      });
  };

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`/Api/users/${id__}`)
        .then(res => {
          setMessage(res.data.message)
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 2000);
        })
    }
  }
  /* get all users */
  useEffect(async () => {
    await axios.get("/Api/users").then((res) => {
      setUsers(res.data);
    });
  }, [show]);

  return (
    <div className="container-lg p-5 mt-3">
      <Alert message={message} show={show} />
      <div className="d-flex justify-content-between">
        <div>
          <button type="button"  className={classes.button} onClick={() => navigate('/add')}>
            Add Collaborator
            <i className="fa fa-user p-2"></i>
          </button>
        </div>
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <IconButton >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search.."
            onChange={handleSearch}
            inputProps={{ 'aria-label': 'search ' }}
          />

        </Paper>
      </div>
      <div className="row justify-content-evenly ">
        <div className="col-lg-12 col-md-12 mt-4">
          <div className="shadow-lg p-0 mb-5 " style={{ backgroundColor: 'white' }}>
            <table className="table table-hover">

              <thead className="thead" style={{ backgroundColor: "#221f3b" }}>
                <tr style={{ color: "#f2f2f3", fontFamily: "sans-serif" }}>
                  <th scope="col" >#</th>
                  <th scope="col" >Full Name</th>
                  <th scope="col" >Email</th>
                  <th scope="col" >Username</th>
                  <th scope="col" >Occupation</th>
                  <th scope="col" >Phone Number</th>
                  <th scope="col-md-8.5" >Actions</th>
                </tr>
              </thead>
              <tbody>

                {users.filter(user => user._id !== auth.user.id).map(({ lastname, firstname, email, username, occupation, phone, _id }, id) => (
                  <RowUsers
                    index={id + 1}
                    fullname={firstname + ' ' + lastname}
                    email={email}
                    username={username}
                    occupation={occupation}
                    phone={phone}
                    Id={_id}
                    OnDelete={OnDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


  );
}

export default AdminPanel;