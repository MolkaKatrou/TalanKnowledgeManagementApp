import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Common/Navbar'
import axios from 'axios'
import AdminInput from '../Components/inputs/AdminInput'


function Forgotpassword() {
    const [email, setEmail] = useState({})
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    function onChangeHandler(e) {
        setEmail({
            ...email,
            [e.target.name]: e.target.value,
          });
        };

    const PostEmail = ()=>{
        axios.post('/Api/forgotpassword', email)
        .then(res=>{
          setMessage(res.data.message)
          setShow(true)
    
        })
        .catch(err=>console.log(err))
    }
  
    
    
       
 

    return (
        <>
        <Navbar/>
        <div className='main h-100 w-100'>
            <div className='container h-100'>
                <div className='row h-100'>
                    <div className='col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100'>
                        <div className='d-table-cell align-middle'>
                            <div className='text-center mt-5'>
                                <h1 className='h2' style={{color :'rgb(8, 8, 126)'}}>Reset password</h1>
                                <p class='lead' style={{color:'grey'}}> Enter your email to reset your password</p>
                            </div>

                            <div className='card mt-5'>
                                <div className='card-body'>
                                    <div className='m-sm-4'>
                                        <form>
                                            <AdminInput
                                                label="Email"
                                                labelclass="form-label mb-4"
                                                type="text"
                                                name="email"
                                                icon="fa fa-envelope"
                                                onChangeHandler={onChangeHandler}
                                            />
                                            <div className='text-center mt-5 p-3'>
                                            <button type="submit" className='button btn-login' onClick={()=>PostEmail()}>Reset Password</button>
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