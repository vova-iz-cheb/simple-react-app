import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userInit } from '../actions/userActions';

export const Login = () => {
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Аутентификация';
  });

  const submitHandler = e => {
    e.preventDefault();

    const body = JSON.stringify({
      login,
      password,
    });

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) setError(result.error);
        else {
          localStorage.setItem('userId', result._id);
          dispatch(
            userInit({
              id: result._id,
              login: result.login,
              reg_date: result.reg_date,
              avatar: result.avatar,
            })
          );
          history.push('/');
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  return (
    <form>
      {error ? <div className="error">{error}</div> : null}
      <label htmlFor="login">Login</label>
      <br />
      <input type="text" id="login" value={login} onChange={e => setLogin(e.currentTarget.value)} />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
      />
      <br />
      <input type="submit" value="Войти" onClick={submitHandler} />
    </form>
  );
};
