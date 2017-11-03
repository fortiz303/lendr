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
import Home from './Home';
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

            <Route exact path="/" component={Login}/>
            
            <Router path="/home" component={Home}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-2">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Feed</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" href="#">New Post</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">My Transactions</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link disabled" href="#">My Profile</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <Route path="/home/feed" component={Feed} />
                    <Route path="/home/new" component={About} />
                  </div>
                </div>
              </div>
            </Router>
            
            <Route path="/about" component={About}/>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
