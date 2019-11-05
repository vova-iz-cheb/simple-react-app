import { CREATE_NEWS_REQUEST, CREATE_NEWS_SUCCESS, CREATE_NEWS_FAILED } from '../constants';

const initialState = {
  error: '',
  isLoading: false,
};

const createNews = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
      };

    case CREATE_NEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default createNews;
