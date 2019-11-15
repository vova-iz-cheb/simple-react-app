import {
  FETCHING_ALL_NEWS_REQUEST,
  FETCHING_ALL_NEWS_SUCCESS,
  FETCHING_ALL_NEWS_FAILED,
} from '../constants';

import allNews, { initialState } from './allNewsReducer';

describe('All news reducer test', () => {
  it('1)FETCHING_ALL_NEWS_REQUEST', () => {
    const action = {
      type: FETCHING_ALL_NEWS_REQUEST,
    };

    expect(allNews(initialState, action)).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('2)FETCHING_ALL_NEWS_SUCCESS', () => {
    const action = {
      type: FETCHING_ALL_NEWS_SUCCESS,
      news: [1, 2, 3],
    };

    expect(allNews(initialState, action)).toEqual({
      news: action.news,
      error: '',
      isFetching: false,
    });
  });

  it('3)FETCHING_ALL_NEWS_FAILED', () => {
    const initialState = {
      news: [],
      error: '',
      isFetching: true,
    };

    const action = {
      type: FETCHING_ALL_NEWS_FAILED,
      error: 'String',
    };

    expect(allNews(initialState, action)).toEqual({
      ...initialState,
      error: action.error,
      isFetching: false,
    });
  });
});
