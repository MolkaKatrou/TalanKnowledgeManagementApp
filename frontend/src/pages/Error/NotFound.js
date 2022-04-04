import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'


function NotFound() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  return (
<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="signup-form">
                <form action="" class="mt-5 border p-4 bg-light shadow">
                    <h4 class="mb-5 text-secondary">Create an account</h4>
                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label>First Name<span class="text-danger">*</span></label>
                            <input type="text" name="fname" class="form-control" placeholder="Enter First Name"/>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label>Last Name<span class="text-danger">*</span></label>
                            <input type="text" name="Lname" class="form-control" placeholder="Enter Last Name"/>
                        </div>

                        <div class="mb-3 col-md-12">
                            <label>Password<span class="text-danger">*</span></label>
                            <input type="password" name="password" class="form-control" placeholder="Enter Password"/>
                        </div>
                        <div class="mb-3 col-md-12">
                            <label>Confirm Password<span class="text-danger">*</span></label>
                            <input type="password" name="confirmpassword" class="form-control" placeholder="Confirm Password"/>
                        </div>
                        <div class="col-md-12">
                           <button class="btn btn-primary float-end">Signup Now</button>
                        </div>
                    </div>
                </form>
                <p class="text-center mt-3 text-secondary">If you have account, Please <a href="#">Login Now</a></p>
            </div>
        </div>
    </div>
</div>
        );
        }

    export default NotFound;