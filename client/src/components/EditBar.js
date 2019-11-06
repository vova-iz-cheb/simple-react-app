import React from 'react';
import PropTypes from 'prop-types';

export const EditBar = props => {
  const {
    dispatch,
    editNews,
    deleteNews,
    deleteNewsFailed,
    deleteNewsSuccess,
    id,
    userId,
    history,
  } = props;
  const editNewsHandler = e => {
    e.preventDefault();
    dispatch(editNews(true));
  };

  const deleteNewsHandler = e => {
    e.preventDefault();
    const conf = confirm('Вы действительно ходите удалить новость? Это действие необратимо!');

    if (!conf) return;

    dispatch(deleteNews);
    return fetch('/api/news', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        id,
        userId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) dispatch(deleteNewsFailed(result.error));
        if (result.success) {
          dispatch(deleteNewsSuccess);
          history.replace('/');
        }
      })
      .catch(error => dispatch(deleteNewsFailed('Проблемы с сервером')));
  };

  return (
    <div className="editbar">
      <a href="" onClick={editNewsHandler}>
        <i className="icon-pencil fa-2x editbar__edit"></i>
      </a>
      <a href="" onClick={deleteNewsHandler}>
        <i className="icon-trash-empty fa-2x editbar__delete"></i>
      </a>
    </div>
  );
};

EditBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editNews: PropTypes.func.isRequired,
  deleteNews: PropTypes.object.isRequired,
  deleteNewsFailed: PropTypes.func.isRequired,
  deleteNewsSuccess: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};
