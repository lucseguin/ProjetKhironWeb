import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as axios from "axios";
import { Auth } from 'aws-amplify';
import EventCoordinator from './components/EventCoordinator';

axios.defaults.baseURL = window._env_.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(function (config) {
    return Auth.currentSession()
      .then(session => {
        var user = EventCoordinator.retreive("user");
        if(user) {
          config.headers.Site = user.site._id
        }
        // User is logged in. Set auth header on all requests
        config.headers.Authorization = session.getIdToken().getJwtToken();
        return Promise.resolve(config)
      })
      .catch(() => {
        // No logged-in user: don't set auth header
        return Promise.resolve(config)
      })
  })

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>, 
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
