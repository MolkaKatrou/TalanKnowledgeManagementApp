import axios from 'axios';
import { ERRORS, SET_USER, GET_USERS, UPDATE_USER } from '../types';
import jwt_decode from 'jwt-decode';
import { setAuth } from '../../utils/setAuth';
import { getAllAnswers, getAllQuestions } from './questionsActions';


export const AddProfile = (form, setShow, setMessage, e)=>dispatch=>{
    axios
      .post("/Api/users", form)
      .then(res => {
        setShow(true)
        setMessage("User added with success")
        e.target.reset();
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
    axios.post('/Api/login', form) 
    .then(res=>{
      const {token} = res.data
      const {user} = res.data
      localStorage?.setItem('jwt', JSON.stringify(token))
      localStorage?.setItem('user', JSON.stringify(user))
      const decode = jwt_decode(token)
      dispatch(setUser(decode))
      dispatch(getAllUsers())
      setAuth(token)
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

export const UpdateUser = (pic)=>({
    type: UPDATE_USER,
    payload: pic
})

export const getAllUsers = () => async dispatch => {    
    try{      
        const {data} = await axios.get('/Api/users')
        dispatch( {
            type: GET_USERS,
            payload: {data}
        })
    }
    catch(error){
        dispatch( {
            type: ERRORS,
            payload: error,
        })
    }
}