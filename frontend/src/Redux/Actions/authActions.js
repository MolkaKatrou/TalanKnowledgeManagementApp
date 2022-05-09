import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../../utils/setAuth';

export const AddProfile = (form, setShow, setMessage, e)=>dispatch=>{
    axios
      .post("/Api/users", form)
      .then(res => {
        setShow(true)
        setMessage("User added with success")
        e.target.reset();
        dispatch({
            type: ERRORS,
            payload: {}
        })
        setTimeout(() => {
            setShow(false)
        }, 4000);
        
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}

export const LoginAction = (form, setLoading)=>dispatch=>{
    axios.post('/api/login', form) 
    .then(res=>{
      const {token} = res.data
      localStorage.setItem('jwt', JSON.stringify(token))
      const decode = jwt_decode(token)
      dispatch(setUser(decode))
      setAuth(token)
      dispatch({
        type: ERRORS,
        payload: {}
    })
    setLoading(true)
    })
    
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}


export const Logout = ()=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
} 

export const setUser = (decode)=>({
    type: SET_USER,
    payload: decode
})