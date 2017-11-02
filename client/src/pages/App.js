import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Redux
import {Provider, connect} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';

import Home from './Home';
import About from './About';

/* eslint-disable */
const isProduction = false;
/* eslint-enable */

let store;

if (isProduction) {
  store = createStore(
    combineReducers({authReducer}),
    applyMiddleware(thunk)
  );
} else {
  const logger = createLogger({collapsed: true});

  store = createStore(
    combineReducers({authReducer}),
    applyMiddleware(thunk, logger)
  );
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand mb-0 h1">Navbar</span>
            </nav>

            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
