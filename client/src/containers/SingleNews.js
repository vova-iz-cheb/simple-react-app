import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  fetchNews,
  fetchNewsFailed,
  fetchNewsSuccess,
  editNews,
  editNewsFailed,
  editNewsRequest,
  editNewsSuccess,
  deleteNews,
  deleteNewsFailed,
  deleteNewsSuccess,
} from '../actions/newsActions';
import { LoadBox } from '../components/LoadBox';
import { EditBar } from '../components/EditBar';
import { EditNews } from '../components/EditNews';
import { getStringFromDate } from '../utils/getStringFromDate';

export const SingleNews = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  let history = useHistory();
  const { title, content, created_date, changed_date, author, author_id } = useSelector(
    store => store.currentNews.news
  );
  const { error, isLoading, edit } = useSelector(store => store.currentNews);
  const access = useSelector(store => store.user.id === author_id); // удалять новости и их редактировать может лишь тот кто их создал
  const propsForEditBar = {
    dispatch,
    editNews,
    deleteNews,
    deleteNewsFailed,
    deleteNewsSuccess,
    history,
    id,
    userId: access ? author_id : '',
  };

  const propsForEditNews = {
    dispatch,
    editNews,
    editNewsFailed,
    editNewsRequest,
    editNewsSuccess,
    id,
    userId: access ? author_id : '',
    error,
    title,
    content,
    isLoading,
    useState,
  };

  const sendRequest = () => {
    dispatch(fetchNews);

    return fetch(`/api/news/${id}`)
      .then(response => response.json())
      .then(result => dispatch(fetchNewsSuccess(result)))
      .catch(err => dispatch(fetchNewsFailed('Ошибка загрузки, попробовать еще раз')));
  };

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (edit) document.title = 'Edit News';
    else if (title) document.title = title;
    else document.title = 'Новость';
  }, [title, edit]);

  if (edit) return <EditNews {...propsForEditNews} />;

  return (
    <div>
      {!error && access && <EditBar {...propsForEditBar} />}
      {error && (
        <div className="error">
          {error} <button onClick={sendRequest}>Загрузить</button>
        </div>
      )}
      {isLoading && <LoadBox />}
      {!isLoading && !error && (
        <article>
          <h2 style={{ marginRight: 100 }}>{title}</h2>
          <div>
            <p>{content}</p>
          </div>
          <footer>
            <p>Автор: {author}</p>
            {changed_date && (
              <p>
                Изменено: <time dateTime={changed_date}>{getStringFromDate(changed_date)}</time>
              </p>
            )}
            <p>
              Создано: <time dateTime={created_date}>{getStringFromDate(created_date)}</time>
            </p>
          </footer>
        </article>
      )}
    </div>
  );
};
