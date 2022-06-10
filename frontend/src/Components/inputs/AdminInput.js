import React from 'react'
import classnames from 'classnames'
import '../../App.css'

function AdminInput({ label, type, success, labelclass, name, icon, onChangeHandler, errors, value, placeholder }) {
  return (
    <div className="mb-3 col-md-19">
      <label className={labelclass} style={{ fontWeight: 'bold' }}>{label}<span className="text-danger">*</span></label>
      <div className="input-group">
        <span className="input-group-text" >
          <i className={icon}></i>
        </span>
        <input
          style={{ fontFamily: 'sans-serif' }}
          className={(classnames("form-control admin-input", { "is-invalid": errors }, { "form-control is-valid": success }))}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChangeHandler}
          autocapitalize="words" />
        {
          errors && (<div id="validationServer03Feedback" className="invalid-feedback">
            {errors}
          </div>)

        }




      </div>
    </div>
  )
}

export default AdminInput