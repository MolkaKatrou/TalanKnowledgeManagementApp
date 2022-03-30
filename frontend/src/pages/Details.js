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
            label="email"
            type="text"
            name="email"
            onChangeHandler={onChangeHandler}
            errors={errors.email}
            value={form.email}

          />
          <AdminInput
            label="username"
            type="text"
            name="username"
            onChangeHandler={onChangeHandler}
            errors={errors.username}
            value={form.username}

          />
          <AdminInput
            label="password"
            type="text"
            name="password"
            onChangeHandler={onChangeHandler}
            errors={errors.password}
            value={form.password}

          />
          <AdminRoleOption
            label="occupation"
            type="text"
            name="occupation"
            onChangeHandler={onChangeHandler}
            errors={errors.occupation}
            value={form.occupation}
          />
          <button className="btn btn-primary" type="submit">Update Collaborator</button>
        </form>
      </div>
  )
}

export default Details