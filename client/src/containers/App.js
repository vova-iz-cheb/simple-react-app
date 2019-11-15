import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import { NotFound } from '../components/NotFound';

import Home from './Home';
import { SingleNews } from './SingleNews';
import { Registration } from './Registration';
import { Login } from './Login';
import { Profile } from './Profile';
import { CreateNewsForm } from './CreateNewsForm';
import { userInit } from '../actions/userActions';
import '../styles/style.scss';

export const App = () => {
  const login = useSelector(store => store.user.login);
  const dispatch = useDispatch();

  // инициализация пользователя, если нет login'а в redux store, а в localStorage есть id пользователя, то получаем данные юзера с сервера и запускаем dispatch(userInit)
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
                reg_date: result.reg_date,
                avatar: result.avatar,
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/news/create">
            <CreateNewsForm />
          </Route>
          <Route path="/news/:id">
            <SingleNews />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </Fragment>
  );
};
