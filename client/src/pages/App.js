import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

// Redux
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import transactionReducer from '../reducers/transactionReducer';

import Wrapper from './Wrapper';

import Login from './Login';
import Feed from './Feed';
import About from './About';
import New from './New';

/* eslint-disable */
const isProduction = false;
/* eslint-enable */

let store;

if (isProduction) {
  store = createStore(
    combineReducers({authReducer, transactionReducer}),
    applyMiddleware(thunk)
  );
} else {
  const logger = createLogger({collapsed: true});

  store = createStore(
    combineReducers({authReducer, transactionReducer}),
    applyMiddleware(thunk, logger)
  );
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="router-wrapper">
            <Switch>
              <Route exact path="/login" component={Login}/>
              <div className="main-content-wrapper">
                <div className="container-fluid">
                  <nav className="navbar navbar-dark bg-dark fixed-top">
                    <span className="navbar-brand mb-0 h1">Navbar</span>
                  </nav>
                  <div className="row">
                    <div className="col">
                      <h2>Hello...</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <ul className="nav flex-column test">
                        <li className="nav-item">
                          <Link to="/">Feed</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/new">New</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/about">About</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col">
                      <Switch>
                        <Route exact component={Feed}  path="/" />
                        <Route exact component={New}  path="/new" />
                        <Route exact component={About}  path="/about" />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
