import React, { useEffect, useState } from "react";
import RowUsers from "../Components/RowUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";


function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

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
  });
  return (
 
    <section className="container-add">
     
    <div class="container p-5 mt-3">
    <Alert message={message} show={show} />
        <div class="d-flex mt-4 ">
           <button type="button" class="btn btn-success" onClick={() => navigate('/add')}>
             Add User
             <i className="fa fa-user p-2"></i>
            </button>
          </div>
          
    <div class="row justify-content-evenly ">    
       <div class="col-lg-12 col-md-12 mt-4">
           <div class="shadow-lg p-0 mb-5 " style={{backgroundColor: 'white' }}>
            <table class="table table-hover">
        
          <thead className="thead">
            <tr style={{color: "#f2f2f3", fontFamily:"sans-serif"}}>
            <th scope="col" >Role</th>
              <th scope="col" >Full Name</th>
              <th scope="col" >Email</th>
              <th scope="col" >Username</th>
              <th scope="col" >Occupation</th>
              <th scope="col" >Phone Number</th>
              <th scope="col" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ role, lastname,firstname, email, username, occupation, phone, _id }) => (
              <RowUsers
                role={role}
                fullname={firstname +' '+ lastname.toUpperCase()}
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
      </section>

  );
}

export default AdminPanel;