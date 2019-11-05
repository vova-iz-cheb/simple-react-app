import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

export const UserBox = props => {
  const login = useSelector(store => store.user.login);
  const avatar = useSelector(store => store.user.avatar);
  const dispatch = useDispatch();

  let history = useHistory();

  const onClickHandler = e => {
    e.preventDefault();

    fetch('/api/logout', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          localStorage.removeItem('userId');
          localStorage.removeItem('createNewsTitle');
          localStorage.removeItem('createNewsContent');
          dispatch(logout);
          history.push('/');
        }
      })
      .catch(err => console.log('Error: ', err));
  };

  let inner;
  if (login) {
    const src = '/img/' + avatar + '.jpg';
    inner = (
      <div>
        <img src={src} alt="Avatar" />
        <NavLink to="/profile">{login}</NavLink> |
        <a href="" onClick={onClickHandler}>
          logout
        </a>
      </div>
    );
  } else {
    inner = (
      <ul>
        <li>
          <NavLink to="/login">Войти</NavLink>
        </li>
        <li>
          <NavLink to="/registration">Регистрация</NavLink>
        </li>
      </ul>
    );
  }

  return inner;
};
