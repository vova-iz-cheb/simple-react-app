import {
  FETCHING_ALL_NEWS_REQUEST,
  FETCHING_ALL_NEWS_SUCCESS,
  FETCHING_ALL_NEWS_FAILED,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
  EDIT_NEWS,
  EDIT_NEWS_REQUEST,
  EDIT_NEWS_SUCCESS,
  EDIT_NEWS_FAILED,
  DELETE_NEWS_REQUEST,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILED,
} from '../constants';

/*--- get all news ---*/
export const fetchingAllNews = {
  type: FETCHING_ALL_NEWS_REQUEST,
};

export const fetchingAllNewsFailed = error => {
  return {
    type: FETCHING_ALL_NEWS_FAILED,
    error,
  };
};

export const fetchingAllNewsSuccess = news => {
  return {
    type: FETCHING_ALL_NEWS_SUCCESS,
    news,
  };
};

/*--- get news by id ---*/
export const fetchNews = {
  type: FETCH_NEWS_REQUEST,
};

export const fetchNewsFailed = error => {
  return {
    type: FETCH_NEWS_FAILED,
    error,
  };
};

export const fetchNewsSuccess = news => {
  return {
    type: FETCH_NEWS_SUCCESS,
    news,
  };
};

/*--- change current news ---*/
export const editNews = edit => {
  return {
    type: EDIT_NEWS,
    edit,
  };
};

export const editNewsRequest = {
  type: EDIT_NEWS_REQUEST,
};

export const editNewsFailed = error => {
  return {
    type: EDIT_NEWS_FAILED,
    error,
  };
};

export const editNewsSuccess = news => {
  return {
    type: EDIT_NEWS_SUCCESS,
    news,
  };
};

/*--- delete current news ---*/
export const deleteNews = {
  type: DELETE_NEWS_REQUEST,
};

export const deleteNewsFailed = error => {
  return {
    type: DELETE_NEWS_FAILED,
    error,
  };
};

export const deleteNewsSuccess = {
  type: DELETE_NEWS_SUCCESS,
};
