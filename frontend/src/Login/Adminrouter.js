import React from 'react'
import { Navigate } from 'react-router-dom'

const Adminrouter = ({user, children}) => {
if (!user.isConnected) {
    return  <Navigate to="/login"  replace/>
  }else{
    if(user.role!="ADMIN"){
      return <Navigate to ="/noaccess" replace/>
    }
  }
    return children
}


export default Adminrouter