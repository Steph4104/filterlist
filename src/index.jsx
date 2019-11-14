import '@babel/polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/Costum.scss';
import App from "./app";

render(
    <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('app'),
);
