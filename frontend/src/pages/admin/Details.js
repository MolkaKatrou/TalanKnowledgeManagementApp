import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminInput from '../../Components/inputs/AdminInput'
import AdminRoleOption from '../../Components/inputs/AdminRoleOption';
import AdminHeader from '../../Common/AdminHeader'
import { Button, ChakraProvider } from '@chakra-ui/react';
import AdminUserInput from '../../Components/inputs/AdminUserInput';

function Details() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();


  function onChangeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.put(`/Api/users/${id}`, form)
      .then(res => {
        navigate('/admin')
      })
      .catch(err => setErrors(err.response.data))

  }


  useEffect(async () => {
    await axios.get(`/Api/users/${id}`)
      .then((res) => {
        setForm(res.data);
      });
  }, []);


  return (
    <div style={{ backgroundColor: 'rgb(225, 228, 232)', height: '100%', paddingBottom: '107px' }}>
      <AdminHeader />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 py-5 px-4 border bg-light shadow"  >

            <div className="signup-form">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Last Name"
                      type="text"
                      name="lastname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.lastname}
                      value={form.lastname}
                      icon="fa fa-user"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="First Name"
                      type="text"
                      name="firstname"
                      onChangeHandler={onChangeHandler}
                      errors={errors.firstname}
                      value={form.firstname}
                      icon="fa fa-user"
                    />
                  </div>


                  <AdminInput
                    label="Email"
                    type="text"
                    name="email"
                    onChangeHandler={onChangeHandler}
                    errors={errors.email}
                    value={form.email}
                    icon="fa fa-envelope"

                  />


                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Username"
                      type="text"
                      name="username"
                      onChangeHandler={onChangeHandler}
                      errors={errors.username}
                      value={form.username}
                      icon="fa fa-user"

                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <AdminInput
                      label="Phone Number"
                      type="text"
                      name="phone"
                      onChangeHandler={onChangeHandler}
                      errors={errors.phone}
                      value={form.phone}
                      icon="fa fa-phone"
                    />
                  </div>
                  <AdminRoleOption
                    label="occupation"
                    type="text"
                    name="occupation"
                    onChangeHandler={onChangeHandler}
                    errors={errors.occupation}
                    value={form.occupation}
                    icon="fa fa-briefcase"
                  />
                  <AdminUserInput
                    label="Role"
                    type="text"
                    name="role"
                    onChangeHandler={onChangeHandler}
                    errors={errors.role}
                    value={form.role}
                    icon="fa fa-briefcase"
                  />

                  <ChakraProvider>
                    <Button colorScheme='teal' className=' mt-4 mx-2' size='md' onClick={onSubmitHandler}>
                      Update Collaborator
                    </Button>
                  </ChakraProvider>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Details