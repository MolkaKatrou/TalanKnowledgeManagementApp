import {GET_CATEGORIES,FOLLOW, ERRORS} from '../types'

import axios from 'axios'

export const getAllCategory = () => async dispatch => {    
    try{
        const res = await axios.get('/Api/categories')
        dispatch( {
            type: GET_CATEGORIES,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: ERRORS,
            payload: error,
        })
    }

}

export const updateCategories = (formcategory) => {
    return dispatch => {
        const res = axios.post('/Api/categories/update', formcategory);

    }
}


export const deleteCategories = (ids) => {
    return async dispatch => {
        const res = await axios.post('/Api/categories/delete', {
            payload: {
                ids
            }
        });          
    }
}

export const FollowCategory = (id) => async dispatch => {
    try {
      const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
      const { data } = await axios.patch(`/Api/categories/${id}/follow`, token)
      dispatch({ type: FOLLOW, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};


