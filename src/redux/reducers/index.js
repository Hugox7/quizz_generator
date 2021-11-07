import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import typeReducer from './typeReducer';
import quizzReducer from './quizzReducer';

const reducers = combineReducers({
  auth: authReducer,
  toasts: toastReducer,
  types: typeReducer,
  quizz: quizzReducer,
});

export default reducers;
