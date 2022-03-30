import React, { useEffect, useState } from "react";
import AdminInput from "../Components/AdminInput";
import RowUsers from "../Components/RowUsers";
import axios from "axios";
import Alert from "../Components/Alert";
import AdminRoleOption from "../Components/AdminRoleOption";


function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);


  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios.post('/Api/users', form)
      .then(res => {
        setMessage(res.data.message)
        setForm({})
        setErrors({})
        e.target.reset();
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 2000);
      })
      .catch(err => setErrors(err.response.data))

  }

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this user")) {
      axios.delete(`/Api/users/${id__}`)
        .then(res => {
          setMessage(res.data.message)
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 2000);
        })
    }
  }
  /* find all users */
  useEffect(async () => {
    await axios.get("/Api/users").then((res) => {
      setUsers(res.data);
    });
  });
  return (
    <div className="row p-4">
      <div className="mt-4">
      </div>
      <div className="col-12 col-lg-4">


          
        <form onSubmit={onSubmitHandler} autocomplete="off">
          <AdminInput
            label="email"
            type="text"
            name="email"
            onChangeHandler={onChangeHandler}
            errors={errors.email}
          />
          <AdminInput
            label="username"
            type="text"
            name="username"
            onChangeHandler={onChangeHandler}
            errors={errors.username}
          />
          <AdminInput
            label="password"
            type="text"
            name="password"
            onChangeHandler={onChangeHandler}
            errors={errors.password}
          />

          <AdminRoleOption
            label="occupation"
            type="text"
            name="occupation"
            onChangeHandler={onChangeHandler}
            errors={errors.occupation}
          />

          <button className="btn btn-primary" type="submit"> ADD COLLABORATOR </button>     
        </form>
        <Alert message={message} show={show} />
   
        </div >
      <div className="col-12 col-lg-7">
        <table className="table table-bordered">
          <thead className="thead">
            <tr>
              <th scope="col" className="col">Email</th>
              <th scope="col" className="col">Username</th>
              <th scope="col" className="col">Occupation</th>
              <th scope="col" className="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ email, username, occupation, _id }) => (
              <RowUsers
                email={email}
                username={username}
                occupation={occupation}
                Id={_id}
                OnDelete={OnDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;