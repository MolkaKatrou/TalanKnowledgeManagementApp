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
<div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="signup-form">
                <form action="" className="mt-5 border p-4 bg-light shadow">
                    <h4 className="mb-5 text-secondary">Create an account</h4>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label>First Name<span className="text-danger">*</span></label>
                            <input type="text" name="fname" className="form-control" placeholder="Enter First Name"/>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label>Last Name<span className="text-danger">*</span></label>
                            <input type="text" name="Lname" className="form-control" placeholder="Enter Last Name"/>
                        </div>

                        <div className="mb-3 col-md-12">
                            <label>Password<span className="text-danger">*</span></label>
                            <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
                        </div>
                        <div className="mb-3 col-md-12">
                            <label>Confirm Password<span className="text-danger">*</span></label>
                            <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm Password"/>
                        </div>
                        <div className="col-md-12">
                           <button className="btn btn-primary float-end">Signup Now</button>
                        </div>
                    </div>
                </form>
                <p className="text-center mt-3 text-secondary">If you have account, Please <a href="#">Login Now</a></p>
            </div>
        </div>
    </div>
</div>
        );
        }

    export default NotFound;