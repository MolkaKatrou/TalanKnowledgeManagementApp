import classnames from "classnames";
import { useState } from "react";

function Passwordinput({ onChangeHandler, value, name, placeholder, icon, errors}) {
  const [type, setType] = useState("password");
  const togglePassword = () => {
      if (type === "password") {
          setType("text")
          return;
      }
      setType("password")
  }

  
  return (
        <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text" >
            <i className={icon}></i>
          </span>
                    <input
                        type={type}
                        onChange={onChangeHandler}
                        value={value}
                        name={name}
                        className={(classnames("form-control", {"is-invalid" : errors}))}                        
                        placeholder={placeholder} />
                    
                        <span className="input-group-text" onClick={togglePassword}>
                            {type === "password" ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i className="fa fa-eye"></i>}
                        </span>
                   
                    {
        errors && (<div id="validationServer03Feedback" class="invalid-feedback">
        {errors}
      </div> )
    }
                </div>
            </div>
        

    )
}
export default Passwordinput;