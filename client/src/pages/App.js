import _ from 'lodash';
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
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';

import Login from './Login';
import Feed from './Feed';
import Transaction from './Transaction';
import About from './About';
import Profile from './profile';

/* eslint-disable */
const isProduction = false;
/* eslint-enable */

let store;
let loadingCounter = 0;
let errorcounter = 0;

if (isProduction) {
  store = createStore(
    combineReducers({authReducer, transactionReducer, errorReducer, loadingReducer, userReducer}),
    applyMiddleware(thunk)
  );
} else {
  const logger = createLogger({collapsed: true});

  store = createStore(
    combineReducers({authReducer, transactionReducer, errorReducer, loadingReducer, userReducer}),
    applyMiddleware(thunk, logger)
  );
}


class App extends Component {
  state = {
    error: false,
    loading: false
  };

  componentDidMount = () => {
    store.subscribe(() => {
      const currentStore = store.getState();
      const error = _.get(currentStore, 'errorReducer.error', false);
      const loading = _.get(currentStore, 'loadingReducer.loading', false);

      if (loading) {
        this.setState({loading: loading});
      } else {
        setTimeout(() => {
          this.setState({loading: false})
        }, 250);
      }

      if (error) {
        console.log('setting error state', errorcounter + 1)
        this.setState({error: error});
      }
    })
  };

  render() {
    const {error, loading} = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="router-wrapper">
            {
              loading ? <div className="loading-bar"></div> : null
            }
            <nav className="navbar navbar-light navbar-expand-lg main-nav">
              <span className="navbar-brand mb-0 h1">rosco</span>
              <div className="navbar-nav mr-auto">
                <NavLink activeClassName="active" exact className="nav-item nav-link" to="/">feed</NavLink>
                <NavLink activeClassName="active" className="nav-item nav-link" to="/profile">profile</NavLink>
                <NavLink activeClassName="active" exact className="nav-item nav-link" to="/about">about</NavLink>
              </div>

              <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="/login">logout</NavLink>
              </div>
            </nav>
            {
              error ?
                <div className="alert alert-danger" role="alert">
                  {error}
                </div> : null
            }
            <Switch>
              <Route exact path="/login" component={Login}/>
              <div className={`main-content-wrapper ${loading ? 'loading' : null}`}>
                <div className="container">
                  <Route exact component={Feed}  path="/" />
                  <Route exact component={Transaction}  path="/transaction/:id" />
                  <Route component={Profile} path="/profile/:id" />
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
