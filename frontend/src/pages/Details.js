import axios from 'axios';
import React, {useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import AdminInput from '../Components/AdminInput'
import AdminRoleOption from '../Components/AdminRoleOption';

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
    <div className="container mt-4 col-12 col-lg-4">
        <form onSubmit={onSubmitHandler} autocomplete="off">
          <AdminInput
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
            value={form.Email}

          />
          <AdminInput
            label="Username"
            type="text"
            name="Username"
            onChangeHandler={onChangeHandler}
            errors={errors.Username}
            value={form.Username}

          />
          <AdminInput
            label="Password"
            type="text"
            name="Password"
            onChangeHandler={onChangeHandler}
            errors={errors.Password}
            value={form.Password}

          />
          <AdminRoleOption
            label="Role"
            type="text"
            name="Role"
            onChangeHandler={onChangeHandler}
            errors={errors.Role}
            value={form.Role}
          />
          <button className="btn btn-primary" type="submit">Update Collaborator</button>
        </form>
      </div>
  )
}

export default Details