import React, { Component } from 'react';
import '../styles/bootstrap/bootstrap.css';
import '../styles/index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
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
import New from './New';

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
                  <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg">
                    <span className="navbar-brand mb-0 h1">Navbar</span>
                    <div className=" navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/">Feed</Link>
                        <Link className="nav-item nav-link" to="/new">New</Link>
                        <Link className="nav-item nav-link" to="/about">About</Link>
                      </div>
                    </div>
                  </nav>

                  <Switch>
                    <Route exact component={Feed}  path="/" />
                    <Route exact component={New}  path="/new" />
                    <Route exact component={About}  path="/about" />
                  </Switch>
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
