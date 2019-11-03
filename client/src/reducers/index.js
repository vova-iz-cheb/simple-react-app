import { combineReducers } from 'redux';
import user from './userReducer';

const mainReducer = combineReducers({
  user,
});

export default mainReducer;
