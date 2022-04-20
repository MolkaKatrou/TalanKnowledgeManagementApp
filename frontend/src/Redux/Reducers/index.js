import {combineReducers} from 'redux';
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import categoriesReducer from './categoriesReducer'


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    categories: categoriesReducer
})