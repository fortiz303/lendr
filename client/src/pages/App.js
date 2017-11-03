import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Redux
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import transactionReducer from '../reducers/transactionReducer';

import Login from './Login';
import Feed from './Feed';
import About from './About';

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
          <div>
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand mb-0 h1">Navbar</span>
            </nav>

            <Route exact path="/login" component={Login}/>
            
            <Router path="/">
              <div className="container-fluid">
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
                        <Link to="/about">About</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col">
                    <Route exact path="/" component={Feed} />
                    <Route exact path="/about" component={About} />
                  </div>
                </div>
              </div>
            </Router>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
