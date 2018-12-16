/* @flow */
/* global window */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = window.document.createElement('div');
window.document.body.appendChild(root);

ReactDOM.render(<App />, root);
