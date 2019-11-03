import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Home } from './Home';
import { Registration } from './Registration';
import { Login } from './Login';
import { userInit } from '../actions/userActions';
import '../styles/style.scss';

export const App = () => {
  const login = useSelector(store => store.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!login && localStorage.getItem('userId')) {
      fetch('/api/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          id: localStorage.getItem('userId'),
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.error) localStorage.removeItem('userId');
          else {
            dispatch(
              userInit({
                id: result._id,
                login: result.login,
              })
            );
          }
        })
        .catch(err => console.log('Error: ', err));
    }
  });

  return (
    <Fragment>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Main>
    </Fragment>
  );
};
