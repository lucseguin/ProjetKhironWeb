import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as axios from "axios";
import { Auth } from 'aws-amplify';

axios.defaults.baseURL = "http://projetkhiron.com:3000";

axios.interceptors.request.use(function (config) {
    return Auth.currentSession()
      .then(session => {
        // User is logged in. Set auth header on all requests
        config.headers.Authorization = 'Bearer ' + session.accessToken.jwtToken
        return Promise.resolve(config)
      })
      .catch(() => {
        // No logged-in user: don't set auth header
        return Promise.resolve(config)
      })
  })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
