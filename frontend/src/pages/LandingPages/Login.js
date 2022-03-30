import React, { useState} from 'react';
import bg from '../../images/login.png';
import user from '../../images/iconuser.jpg';
import logo from '../../images/logo2.png'
import "../../assets/Login.css";
import Navbar from '../../Common/Navbar';

export default function Login() {
  const [UserDetails, SetUserDetails] = useState({
    Email: '',
    Password: '',
  })
  const { Email, Password } = UserDetails
  const onChange = (e) => {
    SetUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
    <Navbar/>

    <section class="login-container">
      <div className="login-wrapper">
        <div className='left-login'>
          <img src={bg} />
          <h2>Welcome To Our Knowledge Management Platform  </h2>
          <h3> Increase productivity, social interaction, and trust among the team</h3>
        </div>

        <div className='form-login'>
          <form onSubmit={onSubmit} autocomplete="off">
            <div className='heading1'>
              <img src={logo} style={{ marginLeft: "-65px", width: "350px" }} alt='login'/>
            </div>
            <div className='heading2'>
              <img style={{ width: "131px" }} src={user} alt='login'/>
            </div>
            <div className='form-input'>

              <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
              <input
                type="email"
                className="input"
                id='Email' name='Email'
                value={Email}
                placeholder="Enter your Email" onChange={onChange}
              />


            </div>
            <div className='form-input'>
              <i class="fa fa-key" aria-hidden="true"></i>
              <input
                type="password"
                className="input"
                id='Password'
                name='Password'
                value={Password}
                placeholder="Enter your password "
                onChange={onChange}
              />
            </div>

            <div className='form-input'>
              <button type="submit" className='button btn-login'>LOGIN</button>
            </div>

          </form>
        </div>
      </div>
    </section>
    </>
  )
}

