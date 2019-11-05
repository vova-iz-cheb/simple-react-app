import { combineReducers } from 'redux';
import user from './userReducer';
import allNews from './allNewsReducer';
import createNews from './createNewsReducer';
import currentNews from './newsReducer';

const mainReducer = combineReducers({
  user,
  allNews,
  createNews,
  currentNews,
});

export default mainReducer;
