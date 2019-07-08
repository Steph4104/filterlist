import '@babel/polyfill';

import { BrowserRouter, Route } from 'react-router-dom';

import React from 'react';
import { render } from 'react-dom';

import List from './pages/List';

import 'bootstrap/dist/css/bootstrap.css';

import App from "./app";
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import './i18n';

render(
  <I18nextProvider i18n={i18next}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </I18nextProvider>,
  document.getElementById('app'),
);
