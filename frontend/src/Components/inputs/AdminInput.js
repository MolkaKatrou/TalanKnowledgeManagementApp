import React from 'react'
import classnames from 'classnames'
import '../../App.css'

function AdminInput({ label, type,labelclass, name, icon, onChangeHandler, errors, value }) {
  return (
    <div class="mb-3 col-md-19">
      <label className={labelclass}>{label}<span class="text-danger">*</span></label>
      <div className="input-group">
        <span className="input-group-text" >
          <i className={icon}></i>
        </span>
        <input 
        className={(classnames("form-control", { "is-invalid": errors }))} type={type} value={value} name={name} onChange={onChangeHandler}  autocapitalize="words" />
        {
          errors && (<div id="validationServer03Feedback" class="invalid-feedback">
            {errors}
          </div>)
          
        }



      </div>
    </div>
  )
}

export default AdminInput