import React, { Component } from 'react';

import '../styles/index.css';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'

// Redux
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger, connect} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import transactionReducer from '../reducers/transactionReducer';
import errorReducer from '../reducers/errorReducer';

import Login from './Login';
import Feed from './Feed';
import About from './About';
import Profile from './profile';

/* eslint-disable */
const isProduction = false;
/* eslint-enable */

let store;

if (isProduction) {
  store = createStore(
    combineReducers({authReducer, transactionReducer, errorReducer}),
    applyMiddleware(thunk)
  );
} else {
  const logger = createLogger({collapsed: true});

  store = createStore(
    combineReducers({authReducer, transactionReducer, errorReducer}),
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
                <div className="container">
                  <nav className="navbar navbar-light fixed-top navbar-expand-lg main-nav">
                    <span className="navbar-brand mb-0 h1">Navbar</span>
                    <div className=" navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                        <NavLink activeClassName="active" exact className="nav-item nav-link" to="/">Feed</NavLink>
                        <NavLink activeClassName="active" className="nav-item nav-link" to="/profile">Profile</NavLink>
                        <NavLink activeClassName="active" exact className="nav-item nav-link" to="/about">About</NavLink>
                      </div>
                    </div>
                  </nav>


                    <Route exact component={Feed}  path="/" />
                    <Route component={Profile}  path="/profile" />
                    <Route exact component={About}  path="/about" />

                </div>
              </div>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
};


export default App;
