import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Common/Navbar'
import Passwordinput from '../Components/inputs/Password'
import axios from 'axios'

function Resetpassword() {
    const [password, setPassword] = useState({})
    const [errors, setErrors] = useState({});
    const {token}=useParams()
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);


    function onChangeHandler(e) {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
          });
        };
    
    const changePassword = ()=>{
        axios.post('/Api/resetpassword', password, token)
        .then(res=>{
          setMessage(res.data.message)
          setShow(true)
        })
        .catch(err=>setErrors(err.response.data))
    }
  
    return (
        <>
          <Navbar />
            <div className='main h-100 w-100'>
                <div className='container h-100'>
                    <div className='row h-100'>
                        <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                            <div className='d-table-cell align-middle'>
                                <div className='text-center mt-5'>
                                    <h1 className='h2' style={{ color: 'rgb(8, 8, 126)' }}>Reset password</h1>
                                </div>

                                <div className='card mt-5'>
                                    <div className='card-body'>
                                        <div className='m-sm-4'>
                                            <form className='p-5' onSubmit={changePassword}>

                                                < Passwordinput
                                                    name="password"
                                                    placeholder="Enter your new password"
                                                    icon="fa fa-key"
                                                    onChangeHandler={onChangeHandler}
                                                    errors={errors.password}
                                                />
                                                <div className='mt-5'>
                                                    < Passwordinput
                                                        name="confirm"
                                                        placeholder="Confirm your password"
                                                        icon="fa fa-key"
                                                        onChangeHandler={onChangeHandler}
                                                        errors={errors.confirm}
                                                    />
                                                </div>


                                                <div className='text-center mt-5 p-3'>
                                                    <button type="submit" className='button btn-login'>Reset Password</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpassword