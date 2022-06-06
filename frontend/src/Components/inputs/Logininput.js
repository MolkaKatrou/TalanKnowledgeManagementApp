import React from 'react'
import classnames from 'classnames'

export default function Logininput({ placeholder, value, type, name, icon, onChangeHandler, errors }) {
  return (
    <div className="mb-3">
      <div className="input-group">
        <span style={{ backgroundColor: 'transparent'}} className="input-group-text" >
          <i  className={icon}></i>
        </span>
        <input className={(classnames("form-control ", { "is-invalid": errors }))}
          style={{ fontFamily:'Segoe UI' }}
          type={type}
          value={value}
          name={name}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
        {
          errors && (<div id="validationServer03Feedback" className="invalid-feedback">
            {errors}
          </div>)
        }

      </div>
    </div>

  )
}
