import React from 'react'

function Alert({ message, show }) {
    return (
        <div
            className="alert alert-success col-md-12"
            role="alert"
            style={{ display: show ? "block" : "none" }}
        >
            {message}
        </div>
    )
}

export default Alert