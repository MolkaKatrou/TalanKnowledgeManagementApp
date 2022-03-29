import React from 'react'

function AdminRoleOption({ name, onChangeHandler, errors, value, label }) {
    return (
        <div className="mb-2">
            <label for="Email" className="form-label">
                {label}
            </label>
            <select
                class="form-select"
                aria-label="Default select example"
                value={value}
                onChange={onChangeHandler}
                name={name}
            >
                <option disabled selected>Select A Role</option>
                <option >Fullstack Developer</option>
                <option>BI consultant</option>
                <option >Devops Developer</option>
                <option >IT Business Analyst </option>
                <option >Production support engineer</option>
                <option >Java Software Engineer</option>
                {
                    errors && (<div id="validationServer03Feedback" class="invalid-feedback">
                        {errors}
                    </div>)
                }
            </select>
        </div>
    )
}

export default AdminRoleOption