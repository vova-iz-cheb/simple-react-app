import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNews, createNewsFailed, createNewsSuccess } from '../actions/createNewsActions';
import { LoadBox } from '../components/LoadBox';

export const CreateNewsForm = () => {
  let history = useHistory();

  const { login: author, id: author_id } = useSelector(store => store.user);
  if (!author && !localStorage.getItem('userId')) history.replace('/'); // редирект если аноним забоет адрес в браузерной строке

  const { error, isLoading } = useSelector(store => store.createNews);

  const [title, changeTitle] = useState(localStorage.getItem('createNewsTitle') || '');
  const [content, changeContent] = useState(localStorage.getItem('createNewsContent') || '');

  const onChangeTitle = e => {
    localStorage.setItem('createNewsTitle', e.currentTarget.value);
    changeTitle(e.currentTarget.value);
  };

  const onChangeContent = e => {
    localStorage.setItem('createNewsContent', e.currentTarget.value);
    changeContent(e.currentTarget.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Создать новость';
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();

    dispatch(createNews);

    setTimeout(() => {
      return fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          title,
          content,
          userId: author_id,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.error) dispatch(createNewsFailed(result.error));
          else {
            localStorage.removeItem('createNewsTitle');
            localStorage.removeItem('createNewsContent');
            dispatch(createNewsSuccess);
            history.replace('/');
          }
        })
        .catch(err => {
          dispatch(createNewsFailed('Проблемы на сервере.'));
        });
    }, 500);
  };

  return (
    <>
      {isLoading && <LoadBox />}
      <h1>Add news:</h1>
      <form action="">
        {error && <div className="error">{error}</div>}
        <label htmlFor="title">Заголовок*</label>
        <br />
        <input className="w100" id="title" type="text" value={title} onChange={onChangeTitle} />
        <br />
        <label htmlFor="content">Содержимое*</label>
        <br />
        <textarea
          rows="10"
          className="w100"
          id="content"
          value={content}
          onChange={onChangeContent}
        ></textarea>
        <br />
        <input
          className="btn btn-green"
          type="submit"
          onClick={onSubmitHandler}
          value="Создать"
          disabled={isLoading}
        />
      </form>
    </>
  );
};
