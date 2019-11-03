import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  // const login = useSelector(state => state.user.login);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if(!login && localStorage.getItem('userId')) {
  //     fetch('/api/userdata', {

  //     })
  //   }
  // });

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'PRIVET';
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
        else alert(result.login, result.id);
      })
      .catch(err => {
        console.log(err);
        setError('Что-то пошло не так!');
      });
  };

  return (
    <div>
      <h1>Hello world</h1>
      {error || <div>{error}</div>}
      <form action="">
        <input type="text" name="login" onChange={e => setLogin(e.target.value)} value={login} />
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" onClick={submitHandler} />
      </form>
      <hr />
    </div>
  );
};
