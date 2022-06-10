import React from 'react'
import classnames from 'classnames'

function AdminRoleOption({ name, onChangeHandler, errors, value, label }) {
    return (
        <div className="mb-2">
            <label for="Email" className="form-label" style={{fontWeight:'bold'}}>
            {label}
            </label>
            <span className="text-danger">*</span>
            <select
                aria-label="Default select example"
                value={value}
                onChange={onChangeHandler}
                name={name}
                className={(classnames("form-control", { "is-invalid": errors }))}
            >
                <option disabled selected>Select the job</option>
                <option >Fullstack Developer</option>
                <option>BI consultant</option>
                <option >Devops Developer</option>
                <option >IT Business Analyst </option>
                <option >Production support engineer</option>
                <option >Java Software Engineer</option>

            </select>
            {
                    errors && (<div id="validationServer03Feedback" className="invalid-feedback">
                        {errors}
                    </div>)
                }
        </div>
    )
}

export default AdminRoleOption