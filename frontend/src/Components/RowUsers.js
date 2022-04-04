import React from 'react';
import { Link } from 'react-router-dom';

function RowUsers({ email, username, role, fullname, phone, occupation, Id, OnDelete }) {

  return (
    <tr style={{color:'#5F5B5A'}}>
      <th scope="row">{role}</th>
      <td scope="row">{fullname}</td>
      <th scope="row">{email}</th>
      <td scope="row">{username}</td>
      <td scope="row">{occupation}</td>
      <th scope="row">{phone}</th>

      <td>
        <span class="btn border-shadow update">
          <Link to={`/updateUser/${Id}`} class="text-gradient">
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </span>

        <span className="btn border-shadow delete" >
          <span class="text-gradient" onClick={() => OnDelete(Id)}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </span>

      </td>
    </tr>
  )
}

export default RowUsers