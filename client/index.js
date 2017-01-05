import React from 'react';
import { render } from 'react-dom';

// Import css
import './styles/styles.scss'; //Webpack can import CSS file too!
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import react router deps
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import routes from './routes';

const router = (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

render( router, document.getElementById('root') );