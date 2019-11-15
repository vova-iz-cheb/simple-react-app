import * as types from '../constants';
import { fetchingAllNewsFailed } from './newsActions';

describe('Test actions', () => {
  it('fetchingAllNewsFailed', () => {
    const error = 'Error message';
    expect(fetchingAllNewsFailed(error)).toEqual({
      type: types.FETCHING_ALL_NEWS_FAILED,
      error,
    });
  });
});
