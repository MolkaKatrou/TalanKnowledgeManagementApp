import React, { useEffect, useState } from "react";
import AdminInput from "../../Components/inputs/AdminInput";
import Alert from '@mui/material/Alert';
import AdminRoleOption from "../../Components/inputs/AdminRoleOption";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProfile } from '../../Redux/Actions/authActions'
import axios from "axios";
import AdminUserInput from "../../Components/inputs/AdminUserInput";



function Add() {
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

  }

  useEffect(async () => {
    await axios.get("/Api/users")
      .then((res) => {
        setForm(res.data);
      });
  }, [message]);

  return (
    <div style={{ backgroundColor: 'rgb(225, 228, 232)', height: '100%', paddingBottom: '82px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="signup-form mt-5">
              {show ? <Alert severity="success">{`${fullname} is successfully added! `}</Alert> : ""}
              <form onSubmit={onSubmitHandler} className="mt-3 border p-4 bg-light shadow">

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="First Name"
                      type="text"
                      name="firstname"
                      icon="fa fa-user"
                      onChangeHandler={onChangeHandler}
                      errors={errors.firstname}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Last Name"
                      type="text"
                      name="lastname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.lastname}
                      icon="fa fa-user"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <AdminInput
                    label="Email"
                    type="text"
                    name="email"
                    onChangeHandler={onChangeHandler}
                    errors={errors.email}
                    icon="fa fa-envelope"
                    placeholder="Enter your email"
                  />
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Username"
                      type="text"
                      name="username"
                      onChangeHandler={onChangeHandler}
                      errors={errors.username}
                      icon="fa fa-user"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Password"
                      type="text"
                      name="password"
                      onChangeHandler={onChangeHandler}
                      errors={errors.password}
                      icon="fa fa-key"
                      placeholder="Enter your Password"
                    />
                  </div>

             
                    <AdminInput
                      label="Phone Number"
                      type="text"
                      name="phone"
                      onChangeHandler={onChangeHandler}
                      errors={errors.phone}
                      icon="fa fa-phone"
                      placeholder="Enter your phone number"
                    />
               
             
               <div className="mb-3 col-md-6">
                  <AdminRoleOption
                    label="Occupation"
                    type="text"
                    name="occupation"
                    onChangeHandler={onChangeHandler}
                    errors={errors.occupation}
                    icon="fa fa-briefcase"
                  />
                  </div>
                       <div className="mb-3 col-md-6">
                    <AdminUserInput
                      label="Role"
                      type="text"
                      name="role"
                      onChangeHandler={onChangeHandler}
                      errors={errors.role}
                      icon="fa fa-briefcase"
                    />
                  </div>

                  <button className="btn btn-success mt-3 " type="submit"> Add user </button>
                </div>
              </form>

            </div >
          </div>
        </div></div>
    </div>
  );
}

export default Add