import axios from 'axios';
import React, {useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import AdminInput from '../../Components/inputs/AdminInput'
import AdminRoleOption from '../../Components/inputs/AdminRoleOption';

function Details() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();


  function onChangeHandler(e) {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`/Api/users/${id}`, form)
    .then(res=>{ navigate('/admin')
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  
  useEffect(async () => {
    await axios.get(`/Api/users/${id}`)
      .then((res) => {
      setForm(res.data);
    });
  }, []);

 
  return (
  
       <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="signup-form">
        <form onSubmit={onSubmitHandler}>
        <div class="row">
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="Last Name"
                      type="text"
                      name="lastname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.lastname}
                      value={form.lastname}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="First Name"
                      type="text"
                      name="firstname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.firstname}
                      value={form.firstname}
                    />
                  </div>

        
          <AdminInput
            label="Email"
            type="text"
            name="email"
            onChangeHandler={onChangeHandler}
            errors={errors.email}
            value={form.email}

          />
          <AdminInput
            label="Username"
            type="text"
            name="username"
            onChangeHandler={onChangeHandler}
            errors={errors.username}
            value={form.username}

          />


                  <div class="mb-3 col-md-6">
                    <AdminInput
                      label="Role : ADMIN/USER"
                      type="text"
                      name="role"
                      onChangeHandler={onChangeHandler}
                      errors={errors.role}
                      value={form.role}
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                  <AdminInput
                      label="Phone Number"
                      type="text"
                      name="phone"
                      onChangeHandler={onChangeHandler}
                      errors={errors.phone}
                      value={form.phone}
                    />
                </div>
          <AdminRoleOption
            label="occupation"
            type="text"
            name="occupation"
            onChangeHandler={onChangeHandler}
            errors={errors.occupation}
            value={form.occupation}
          />



          <button className="btn btn-primary mt-5" type="submit">Update Collaborator</button>
       </div>
        </form>

      </div>
      </div>
      </div>
      </div>
      
  )
}

export default Details