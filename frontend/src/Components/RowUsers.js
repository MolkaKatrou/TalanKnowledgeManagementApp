import React from 'react';
import { Link } from 'react-router-dom';

function RowUsers({email, username, password, occupation, Id, OnDelete}) {
  return (
    <tr>
    <th scope="row">{email}</th>
    <td scope="row">{username}</td>
    <td scope="row">{occupation}</td>
    <td className='gap_actions'>
    <span className="badge bg-secondary">
        <Link to={`/updateUser/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>
      </span>

      <span className="badge bg-warning" onClick={()=>OnDelete(Id)}>
        <i className="fas fa-trash-alt"></i>
      </span>
    </td>
  </tr>
  )
}

export default RowUsers