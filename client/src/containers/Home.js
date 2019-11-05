import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewsList } from './NewsList';
import { LoadBox } from '../components/LoadBox';
import {
  fetchingAllNews,
  fetchingAllNewsFailed,
  fetchingAllNewsSuccess,
} from '../actions/newsActions';

export const Home = () => {
  const dispatch = useDispatch();
  const { news, error, isFetching } = useSelector(store => store.allNews);

  const sendRequest = () => {
    dispatch(fetchingAllNews);

    return fetch('/api/news')
      .then(response => response.json())
      .then(result => dispatch(fetchingAllNewsSuccess(result)))
      .catch(err => dispatch(fetchingAllNewsFailed(true)));
  };

  useEffect(() => {
    document.title = 'Simple React App';
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div>
      <h1>News:</h1>
      {error && (
        <div className="error">
          Ошибка загрузки, попробовать еще раз <button onClick={sendRequest}>again</button>
        </div>
      )}
      {isFetching && <LoadBox />}
      {!isFetching && !error && <NewsList news={news} />}
    </div>
  );
};
