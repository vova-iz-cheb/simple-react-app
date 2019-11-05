import {
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

const initialState = {
  news: {},
  edit: false,
  error: '',
  isLoading: false,
};

const singleNews = (state = initialState, action) => {
  switch (action.type) {
    /*--- get news by id ---*/
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        news: action.news,
      };

    case FETCH_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    /*--- change current news ---*/
    case EDIT_NEWS:
      return {
        ...state,
        edit: action.edit,
        error: '',
      };

    case EDIT_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        news: action.news,
        edit: false,
      };

    case EDIT_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    /*--- delete current news ---*/
    case DELETE_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        edit: false,
        isLoading: false,
        error: '',
        news: {},
      };

    case DELETE_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default singleNews;
