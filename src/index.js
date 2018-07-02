import React from 'react';
import ReactDom from 'react-dom';
import AppRoute from './route';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <div>
      <AppRoute userData={store.getState().userData}/>
      <ReduxToastr
        timeout={3000}
        newestOnTop={false}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar />
    </div>
  </Provider>,
  document.getElementById('app')
);
