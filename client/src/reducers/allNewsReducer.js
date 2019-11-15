import {
  FETCHING_ALL_NEWS_REQUEST,
  FETCHING_ALL_NEWS_SUCCESS,
  FETCHING_ALL_NEWS_FAILED,
} from '../constants';

export const initialState = {
  news: [],
  error: '',
  isFetching: false,
};

const allNews = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ALL_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case FETCHING_ALL_NEWS_SUCCESS:
      return {
        news: action.news,
        isFetching: false,
        error: '',
      };

    case FETCHING_ALL_NEWS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default allNews;
