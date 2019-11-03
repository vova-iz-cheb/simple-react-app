import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { App } from './containers/App';

const mymiddle = store => next => action => {
  const n = next(action);

  console.log(`Тип экшена: ${action.type}`);
  console.log(action);
  console.log('Хранилище после экшена: ', store.getState());
  return n;
};

const store = createStore(rootReducer, applyMiddleware(mymiddle));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
