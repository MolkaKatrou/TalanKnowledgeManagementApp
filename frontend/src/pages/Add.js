import React, { useEffect, useState } from "react";
import AdminInput from "../Components/inputs/AdminInput";
import Alert from "../Components/Alert";
import AdminRoleOption from "../Components/inputs/AdminRoleOption";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddProfile } from '../Redux/Actions/authActions'



function Add() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(AddProfile(form, setShow, setMessage, e))

  }


  return (
    <section className="container-add">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="signup-form">
              <Alert message={message} show={show} />
              <form onSubmit={onSubmitHandler} class="mt-3 border p-4 bg-light shadow">

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="Last Name"
                      type="text"
                      name="lastname"
                      icon="fa fa-user"
                      onChangeHandler={onChangeHandler}
                      errors={errors.lastname}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="First Name"
                      type="text"
                      name="firstname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.firstname}
                      icon="fa fa-user"
                    />
                  </div>

                  <AdminInput
                    label="Email"
                    type="text"
                    name="email"
                    onChangeHandler={onChangeHandler}
                    errors={errors.email}
                    icon="fa fa-envelope"
                  />
 <div class="mb-3 col-md-6">
                  <AdminInput
                    label="Username"
                    type="text"
                    name="username"
                    onChangeHandler={onChangeHandler}
                    errors={errors.username}
                    icon="fa fa-user"

                  />
                  </div>
                  <div class="mb-3 col-md-6">
                  <AdminInput
                    label="Password"
                    type="text"
                    name="password"
                    onChangeHandler={onChangeHandler}
                    errors={errors.password}
                    icon="fa fa-key"
                  />
                  </div>
                  
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="Role : ADMIN/USER"
                      type="text"
                      name="role"
                      onChangeHandler={onChangeHandler}
                      errors={errors.role}
                      icon="fa fa-briefcase"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="Phone Number"
                      type="text"
                      name="phone"
                      onChangeHandler={onChangeHandler}
                      errors={errors.phone}
                      icon="fa fa-phone"
                    />
                  </div>


                  <AdminRoleOption
                    label="Occupation"
                    type="text"
                    name="occupation"
                    onChangeHandler={onChangeHandler}
                    errors={errors.occupation}
                    icon="fa fa-briefcase"


                  />

                  <button className="btn btn-success mt-3 " type="submit"> Add user </button>
                </div>
              </form>

            </div >
          </div>
        </div></div>
    </section>
  );
}

export default Add