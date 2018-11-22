/* @flow */
/* global window */
import * as React from 'react';
import ReactDOM from 'react-dom';
import 'modern-normalize/modern-normalize.css';
import App from './App';

ReactDOM.render(
    <App
        issues={process.env.SENTRY_ISSUES}
        sentryURL={`https://sentry.io/${process.env.SENTRY_ORG}/${
            process.env.SENTRY_PROJECT
        }/`}
    />,
    window.document.getElementById('root')
);
