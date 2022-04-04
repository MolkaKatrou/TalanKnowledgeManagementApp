import React from 'react'
import classnames from 'classnames'

export default function Logininput({placeholder,value, type, name, icon, onChangeHandler, errors}) {
  return (
    <div className="mb-3">
       <div className="input-group">
          <span className="input-group-text" >
          <i className={icon}></i>
          </span>
    <input className={(classnames("form-control ", {"is-invalid" : errors}))} type={type} value={value} name={name} onChange={onChangeHandler} 
    placeholder={placeholder}
    />   
    {
        errors && (<div id="validationServer03Feedback" class="invalid-feedback">
        {errors}
      </div> )
    }
    
    </div> 
    </div>

  )
}
