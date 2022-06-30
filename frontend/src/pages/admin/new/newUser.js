import "./new.scss";
import React, { useEffect, useState } from "react";
import AdminInput from "../../../Components/inputs/AdminInput";
import Alert from '@mui/material/Alert';
import AdminRoleOption from "../../../Components/inputs/AdminRoleOption";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProfile } from '../../../Redux/Actions/authActions'
import axios from "axios";
import Sidebar from "../../../Components/sidebar/Sidebar";
import Navbar from "../../../Components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import AdminUserInput from "../../../Components/inputs/AdminUserInput";
import add from '../../../images/add-user.png'
import toast from "react-hot-toast";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [fullname, setFullname] = useState('')


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(AddProfile(form, setShow, setMessage, e))
    setFullname(form.firstname + ' ' + form.lastname.toUpperCase())
    if (show) {
    toast.success(`${fullname} is successfully added! `)
    }

  }

  useEffect(async () => {
    await axios.get("/Api/users")
      .then((res) => {
        setForm(res.data);
      });
  }, [message]);


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {show ? <Alert severity="success" style={{backgroundColor:'#89CA97'}}>{`${fullname} is successfully added! `}</Alert> : ""}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={add} style={{ width: '150px', height: '150px' }}></img>
          </div>

          <div className="right">
            <form onSubmit={onSubmitHandler}>
              <div className="formInput">
                <AdminInput
                  label="First Name"
                  type="text"
                  name="firstname"
                  icon="fa fa-user"
                  onChangeHandler={onChangeHandler}
                  errors={errors.firstname}
                  placeholder="Enter the first name"
                />
              </div>
              <div className="formInput">
                <AdminInput
                  label="Last Name"
                  type="text"
                  name="lastname"
                  onChangeHandler={onChangeHandler}
                  errors={errors.lastname}
                  icon="fa fa-user"
                  placeholder="Enter the last name"
                />
              </div>
              <div className="formInput">
                <AdminInput
                  label="Email"
                  type="text"
                  name="email"
                  onChangeHandler={onChangeHandler}
                  errors={errors.email}
                  icon="fa fa-envelope"
                  placeholder="Enter the email"
                />
              </div>
              <div className="formInput">
                <AdminInput
                  label="Username"
                  type="text"
                  name="username"
                  onChangeHandler={onChangeHandler}
                  errors={errors.username}
                  icon="fa fa-at"
                  placeholder="Enter the username"
                />
              </div>

              <div className="formInput">
                <AdminInput
                  label="Address"
                  type="text"
                  name="adress"
                  icon="fa fa-home"
                  onChangeHandler={onChangeHandler}
                  errors={errors.adress}
                  placeholder="Enter the adress"
                />

              </div>



              <div className="formInput">
                <AdminInput
                  label="Phone Number"
                  type="text"
                  name="phone"
                  onChangeHandler={onChangeHandler}
                  errors={errors.phone}
                  icon="fa fa-phone"
                  placeholder="Enter the phone number"
                />
              </div>



              <div className="formInput">
                <AdminRoleOption
                  label="Occupation"
                  type="text"
                  name="occupation"
                  onChangeHandler={onChangeHandler}
                  errors={errors.occupation}
                  icon="fa fa-briefcase"
                />
              </div>
 

              <div className="formInput">
                <AdminUserInput
                  label="Role"
                  type="text"
                  name="role"
                  onChangeHandler={onChangeHandler}
                  errors={errors.role}
                  icon="fa fa-briefcase"
                />
              </div>

              <button className="btn btn-success mt-3 formInput " type="submit"> Add Collaborator </button>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;