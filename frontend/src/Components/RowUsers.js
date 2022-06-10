import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function RowUsers({ index, email, username, role, fullname, phone, occupation, Id, OnDelete }) {

  return (
    <tr style={{color:'#5F5B5A'}}>
      <td >{index}</td>
      <td >{fullname}</td>
      <td >{email}</td>
      <td >{username}</td>
      <td >{occupation}</td>
      <td >{phone}</td>
      <td  style={{marginLeft:'200px'}}>{role === 'ADMIN' ? <CheckIcon/> : <CloseIcon/> }</td>


      <td>
        <span className="btn border-shadow update">
          <Link to={`/updateUser/${Id}`} className="text-gradient">
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </span>

        <span className="btn border-shadow delete" >
          <span className="text-gradient" onClick={() => OnDelete(Id)}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </span>

      </td>
    </tr>
  )
}

export default RowUsers