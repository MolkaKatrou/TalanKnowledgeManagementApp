import {GET_QUESTIONS, GET_QUESTION, DELETE_QUESTION, VOTE_UP, VOTE_DOWN } from "../types";

const initialState = {
  questions: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.data,
        loading: false,
      };

    case GET_QUESTION:
      return {
        ...state,
        question: action.payload.question,
        loading: false
      };

    case DELETE_QUESTION:
      return { 
        ...state, 
        questions: state.questions.filter((question) => question._id !== action.payload) 
      };

      case VOTE_UP:
        return {
          ...state,
          questions: state.questions.map((question) => {
          if (question._id == +action.payload._id) {
            return action.payload;
          }
          return question;
        }),
      };

      case VOTE_DOWN:
        return {
          ...state,
          questions: state.questions.map((question) => {
          if (question._id == +action.payload._id) {
            return action.payload;
          }
          return question;
        }),
      };


    default:
      return state;

  }
}