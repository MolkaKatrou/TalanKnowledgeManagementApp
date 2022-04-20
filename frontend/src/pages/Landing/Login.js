import React, { useState } from 'react';
import bg from '../../images/login.png';
import user from '../../images/iconuser.jpg';
import logo from '../../images/logo2.png'
import "../../assets/Login.css";
import Navbar from '../../Common/Navbar';
import Logininput from '../../Components/inputs/Logininput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginAction } from '../../Redux/Actions/authActions';
import Passwordinput from '../../Components/inputs/Password';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


export default function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const errors = useSelector(state=>state.errors)
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(!open);
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });  
  };

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(LoginAction(form, setLoading))
   
    
  }

  return (
    <>
      <Navbar />
      <Backdrop open={open}>
        {loading ? <CircularProgress/> : ""}
      </Backdrop>
      <section class="login-container">
        <div className="login-wrapper">
          <div className='left-login'>
            <img src={bg} />
            <h2>Welcome To Our Knowledge Management Platform  </h2>
            <h3> Increase productivity, social interaction, and trust among the team</h3>
          </div>
          <div className='form-login'>
            <form onSubmit={onSubmit} >
              <div className='heading1'>
                <img src={logo} style={{ marginLeft: "-65px", width: "350px" }} alt='login' />
              </div>
              <div className='heading2'>
                <img style={{ width: "131px" }} src={user} alt='login' />
                

              </div>
              <Logininput
                type="text"
                name="email"
                placeholder="Enter your email"
                icon="fa fa-at"
                onChangeHandler={onChange}
                errors={errors.email}

              />
              < Passwordinput
                type={type}
                name="password"
                placeholder="Enter your password"
                onChangeHandler={onChange}
                errors={errors.password}
                icon="fa fa-key"
              />


              <div className='form-input'>
                <button type="submit" className='button btn-login'>LOGIN</button>
                <h6 style={{color:'grey'}}> forgot your password?   
                  <Link to='/forgotpassword' style={{ textDecoration: 'none' }} > Reset it </Link>
                  </h6>
              </div>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

