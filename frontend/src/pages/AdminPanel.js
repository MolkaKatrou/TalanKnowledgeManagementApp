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
            label="Email"
            type="text"
            name="Email"
            onChangeHandler={onChangeHandler}
            errors={errors.Email}
          />
          <AdminInput
            label="Username"
            type="text"
            name="Username"
            onChangeHandler={onChangeHandler}
            errors={errors.Username}
          />
          <AdminInput
            label="Password"
            type="text"
            name="Password"
            onChangeHandler={onChangeHandler}
            errors={errors.Password}
          />

          <AdminRoleOption
            label="Role"
            type="text"
            name="Role"
            onChangeHandler={onChangeHandler}
            errors={errors.Role}
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
              <th scope="col" className="col">Role</th>
              <th scope="col" className="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ Email, Username, Role, _id }) => (
              <RowUsers
                Email={Email}
                Username={Username}
                Role={Role}
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