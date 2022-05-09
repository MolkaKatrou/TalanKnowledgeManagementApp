import {combineReducers} from 'redux';
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import categoriesReducer from './categoriesReducer'
import postsReducer from './postsReducer'


export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    categories: categoriesReducer,
    posts: postsReducer
})