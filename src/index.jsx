import '@babel/polyfill';

import { BrowserRouter, Route } from 'react-router-dom';

import React from 'react';
import { render } from 'react-dom';

import List from './List';

import 'bootstrap/dist/css/bootstrap.css';

render(
  <BrowserRouter>
    <Route component={List} />
  </BrowserRouter>,
  document.getElementById('app'),
);
