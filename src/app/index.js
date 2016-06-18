import React, { Components } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/';
import { render } from 'react-dom';
import MainContainer from './container';
import 'babel-polyfill';

const store = configureStore();

render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('app')
);
