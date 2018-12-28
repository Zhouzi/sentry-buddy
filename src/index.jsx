/* @flow */
/* global window */
import * as React from 'react';
import ReactDOM from 'react-dom';
import 'modern-normalize/modern-normalize.css';
import App from './app/App';

const root = window.document.createElement('div');
window.document.body.appendChild(root);

ReactDOM.render(
  <App
    issues={[
      {
        title: 'Cannot read property "null" of undefined',
        events: 4391,
        users: 829,
        duplicates: 3,
      },
      {
        title: 'null is not an Object',
        events: 32,
        users: 1,
        duplicates: 0,
      },
    ]}
  />,
  root
);
