import React from 'react'
import { Navigate } from 'react-router-dom'

const Redirect = ({user, children}) => {
if (user.isConnected) {
    return  <Navigate to="/Home"  replace/>
  }
    return children
}


export default Redirect
