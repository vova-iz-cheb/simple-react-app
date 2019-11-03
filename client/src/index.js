import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const mymiddle = store => next => action => {
  const n = next(action);

  console.log(`Тип экшена: ${action.type}`);
  console.log(action);
  console.log('Хранилище после экшена: ', store.getState());
  return n;
};

// const store = createStore(rootReducer, applyMiddleware(mymiddle));

ReactDOM.render(<App />, document.getElementById('root'));
