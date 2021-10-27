import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toastReducer from './toastReducer';

const reducers = combineReducers({
  auth: authReducer,
  toasts: toastReducer,
});

export default reducers;
