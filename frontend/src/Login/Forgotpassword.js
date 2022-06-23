import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Common/Navbar'
import axios from 'axios'
import AdminInput from '../Components/inputs/AdminInput'
import Alert from '@mui/material/Alert';
import { HomeContext } from '../Context/HomeContext'


function Forgotpassword() {
    const {t} = useContext(HomeContext)
    const [email, setEmail] = useState({});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    function onChangeHandler(e) {
        setEmail({
            ...email,
            [e.target.name]: e.target.value,
          });
        };

    const PostEmail = (e)=>{
        e.preventDefault();
        axios.post('/Api/forgotpassword', email)
        .then(res=>{ 
            setSuccess(res.data)
            setShow(true)
            setErrors({})
            setTimeout(() => {
                setShow(false)
            }, 3000);
          
        })
        .catch(err=>setErrors(err.response.data))
    }
       
  

    return (
        <>
        <Navbar/>
        <div className='main h-100 w-100' >
            <div className='container h-100' >
                <div className='row h-100'>
                    <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                        <div className='d-table-cell align-middle'>
                            <div className='text-center mt-5'>
                                <h1 className='h2' style={{color :'rgb(8, 8, 126)', fontFamily:'PT Sans'}}>{t('Reset password')}</h1>
                                <p  style={{color:'grey', fontFamily:'PT Sans'}}> {t('Enter your email to reset your password')}</p>
                            </div>
                           { show ? <Alert severity="success">We sent you the link — Check your Email!</Alert> : ""}
                            <div className='card mt-5'>
                                <div className='card-body'>
                                    <div className='m-sm-4'>
                                        <form onSubmit={PostEmail}>
                                            <AdminInput
                                                label="Email"
                                                labelclass="form-label mb-4"
                                                type="text"
                                                name="email"
                                                icon="fa fa-envelope"
                                                onChangeHandler={onChangeHandler}
                                                errors={errors.email}
                                                success={success.email}
                                            />
                                            <div className='text-center mt-5 p-3'>
                                            <button type="submit" className='button btn-login' >Reset Password</button>
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

export default Forgotpassword