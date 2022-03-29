import React from 'react'
import classnames from 'classnames'

function AdminInput({label, type, name, onChangeHandler, errors, value}) {
  return (
    <div className="mb-2">
    <label for="Email" className="form-label">
     {label}
    </label>
    <input className={(classnames("form-control", {"is-invalid" : errors}))} type={type} value={value} name={name} onChange={onChangeHandler} />   
    {
        errors && (<div id="validationServer03Feedback" class="invalid-feedback">
        {errors}
      </div> )
    }
    
    </div> 
  )
}

export default AdminInput