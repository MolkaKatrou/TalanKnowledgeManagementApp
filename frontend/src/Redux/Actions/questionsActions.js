import {GET_QUESTION,DELETE_QUESTION,BOOKMARK_QUESTION, GET_QUESTIONS, VOTE_UP, VOTE_DOWN, ERRORS,GET_ANSWERS, VOTE_UP_ANSWER, VOTE_DOWN_ANSWER, DELETE_ANSWER} from '../types'
import axios from 'axios'

export const getAllQuestions = () => async dispatch => {    
    try{      
        const {data} = await axios.get('/Api/questions')
        dispatch( {
            type: GET_QUESTIONS,
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

export const getQuestion = (id) => async dispatch => {
    try {  
      const {data} = await axios.get(`/Api/questions/${id}`)
      dispatch({ 
            type: GET_QUESTION, 
            payload: { question: data }
    });
    } catch (error) {
        dispatch({
            type: ERRORS,
            payload: error,
        })
    }
  };

export const createQuestion = (question) => async (dispatch) => {
  try {
    const { data } = await axios.post('/Api/questions', question);   
  } catch (error) { 
    dispatch({
        type: ERRORS,
        payload: error,
       
    })
}
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await axios.delete(`/Api/questions/${id}`);
    dispatch({ type: DELETE_QUESTION, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const UpVoteQuestion = (id) => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
    const { data } = await axios.patch(`/Api/questions/${id}/voteup`, token)
    dispatch({ type: VOTE_UP, payload: data });
    dispatch(getAllQuestions());
    }
   catch (error) {
    console.log(error.message);
  }
};

export const DownVoteQuestion = (id) => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
    const { data } = await axios.patch(`/Api/questions/${id}/votedown`, token)
    dispatch({ type: VOTE_DOWN, payload: data });
    dispatch(getAllQuestions());
    }
   catch (error) {
    console.log(error.message);
  }
};

export const BookmarkQuestion = (id) => async dispatch => {
  try {
    const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
    const { data } = await axios.patch(`/Api/questions/${id}/bookmark`, token)
    dispatch({ type: BOOKMARK_QUESTION, payload: data });
    dispatch(getAllQuestions());
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllAnswers = () => async dispatch => {    
  try{      
      const {data} = await axios.get('/Api/answers')
      dispatch( {
          type: GET_ANSWERS,
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



export const createAnswer = (question) => async (dispatch) => {
try {
  const { data } = await axios.post('/Api/answers', question);   
} catch (error) { 
  dispatch({
      type: ERRORS,
      payload: error,
     
  })
}
};

export const deleteAnswer = (id) => async (dispatch) => {
try {
  await axios.delete(`/Api/answers/${id}`);
  dispatch({ type: DELETE_ANSWER, payload: id });
} catch (error) {
  console.log(error);
}
};

export const deleteAnswerComment = (id2) => async (dispatch) => {
  try {
    await axios.delete(`/Api/answers/${id2}/comment/${id2}`);
    dispatch({ type: DELETE_ANSWER, payload: id2 });
  } catch (error) {
    console.log(error);
  }
  };

export const UpVoteAnswer = (id) => async dispatch => {
try {
  const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
  const { data } = await axios.patch(`/Api/answers/${id}/voteup`, token)
  dispatch({ type: VOTE_UP_ANSWER, payload: data });
  dispatch(getAllAnswers());
  
  }
 catch (error) {
  console.log(error.message);
}
};

export const DownVoteAnswer = (id) => async dispatch => {
try {
  const token = JSON.parse(localStorage.getItem('jwt')).split(" ")[1]
  const { data } = await axios.patch(`/Api/answers/${id}/votedown`, token)
  dispatch({ type: VOTE_DOWN_ANSWER, payload: data });
  dispatch(getAllAnswers());
  }
 catch (error) {
  console.log(error.message);
}
};

export const CommentAnswer =(value,id) => async dispatch =>{
  try {
      const {data}= await axios.post(`/Api/answers/${id}/comment`, value )
      console.log(data)
  } catch (error) {
      console.log(error);
  } 
}
