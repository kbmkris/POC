import React from 'react';
import ReactDom from 'react-dom';
import AppRoute from './route';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('app')
);
