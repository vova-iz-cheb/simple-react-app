import { CREATE_NEWS_REQUEST, CREATE_NEWS_SUCCESS, CREATE_NEWS_FAILED } from '../constants';

export const createNews = {
  type: CREATE_NEWS_REQUEST,
};

export const createNewsSuccess = {
  type: CREATE_NEWS_SUCCESS,
};

export const createNewsFailed = error => {
  return {
    type: CREATE_NEWS_FAILED,
    error,
  };
};
