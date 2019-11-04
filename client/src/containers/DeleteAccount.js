import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';

export const DeleteAccount = () => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const id = useSelector(store => store.user.id);

  const handleSubmit = e => {
    e.preventDefault();

    const conf = confirm(
      'Это действие нельзя обратить. Вы действительно ходите удалить свой аккаунт?'
    );

    if (!conf) return;

    const body = JSON.stringify({
      id,
      password,
    });

    fetch('/api/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          setError(result.error);
          setTimeout(() => {
            setError('');
          }, 5000);
        }
        if (result.success) {
          localStorage.removeItem('userId');
          dispatch(logout);
          history.push('/');
        }
      })
      .catch(err => {
        setError('Сервер не доспупен, приносим свои извинения.');
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <form>
      <h2>Удалить аккаунт:</h2>
      {error ? <div className="error">{error}</div> : null}

      <label htmlFor="oldpassword">Пароль</label>
      <br />
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
      />
      <br />

      <input type="submit" value="Удалить" onClick={handleSubmit} />
    </form>
  );
};
