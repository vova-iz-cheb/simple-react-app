import React from 'react';
import PropTypes from 'prop-types';
import { LoadBox } from './/LoadBox';

export const EditNews = props => {
  const {
    dispatch,
    editNews,
    editNewsFailed,
    editNewsRequest,
    editNewsSuccess,
    id,
    userId,
    error,
    title,
    content,
    isLoading,
    useState,
  } = props;

  const [localTitle, changeTitle] = useState(title);
  const [localContent, changeContent] = useState(content);

  const onChangeTitle = e => {
    changeTitle(e.currentTarget.value);
  };

  const onChangeContent = e => {
    changeContent(e.currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    dispatch(editNewsRequest);

    setTimeout(() => {
      return fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          title: localTitle,
          content: localContent,
          id,
          userId,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.error) dispatch(editNewsFailed(result.error));
          else {
            dispatch(editNewsSuccess(result));
          }
        })
        .catch(err => {
          dispatch(editNewsFailed('Проблемы на сервере.'));
        });
    }, 500);
  };

  const cancel = () => {
    dispatch(editNews(false));
  };

  return (
    <>
      {isLoading && <LoadBox />}
      <h1>Edit news:</h1>
      <form action="">
        {error && <div className="error">{error}</div>}
        <label htmlFor="title">Заголовок*</label>
        <br />
        <input
          className="w100"
          id="title"
          type="text"
          value={localTitle}
          onChange={onChangeTitle}
        />
        <br />
        <label htmlFor="content">Содержимое*</label>
        <br />
        <textarea
          rows="10"
          className="w100"
          id="content"
          value={localContent}
          onChange={onChangeContent}
        ></textarea>
        <br />
        <input className="btn btn-green" type="button" onClick={cancel} value="Назад" />
        <input className="btn btn-green" type="submit" onClick={onSubmitHandler} value="Изменить" />
      </form>
    </>
  );
};

EditNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editNews: PropTypes.func.isRequired,
  editNewsFailed: PropTypes.func.isRequired,
  editNewsRequest: PropTypes.object.isRequired,
  editNewsSuccess: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  useState: PropTypes.func.isRequired,
};
