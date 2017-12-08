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
import {Provider, connect} from 'react-redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import authActions from '../actions/authActions';

import transactionReducer from '../reducers/transactionReducer';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';

import Login from './Login';
import Feed from './Feed';
import Transaction from './Transaction';
import About from './About';
import Profile from './profile';

import Modal from '../components/Modal'

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

class Wrapper extends Component {
  componentDidMount = () => {
    const {user, location, dispatch} = this.props;
    if (!user) {
      if (location.pathname !== '/login') {
        const token = _.get(window.sessionStorage, 'token', false);
        if (token) {
          if (token === 'false') {
            window.location.pathname = '/login';
          } else {
            dispatch(authActions.authenticate(token));
          }
        }
      }
    }
  };

  render() {
    const {loading, error, user, modal} = this.props;
    const shouldDisplayNav = !!user;
    return (
      <div className="container-fluid">
        {loading ? <div className="loading-bar"></div> : null}
        {
          error ?
            <div className="alert alert-danger" role="alert">
              {error}
            </div> : null
        }
        <p className="lead">rosco</p>
        <div class="row">
          {shouldDisplayNav ?
            <div class="col-md-4 col-lg-2">
              <div className="content-wrapper nav-wrapper">
                <NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/">feed</NavLink>
                <NavLink activeClassName="btn-primary" className="nav-item nav-link" to="/profile">profile</NavLink>
                {/*<NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/about">about</NavLink>*/}
                <hr />
                <NavLink className="nav-item nav-link" to="/login">logout</NavLink>
                <hr />
                <p className="text-center mb-0"><small class="text-muted">2017 rosco</small></p>
              </div> 
            </div> : null
          }
          
          <div className="col">
            <div className="content-wrapper">
              {this.props.children}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    error: state.errorReducer.error,
    loading: state.loadingReducer.loading,
    modal: state.errorReducer.modal
  }
};

const WrappedWrapper = connect(mapStateToProps)(Wrapper);

class App extends Component {
  state = {
    error: false,
    loading: false,
    user: false
  };

  // componentDidMount = () => {
  //   store.subscribe(() => {
  //     const currentStore = store.getState();
  //     const error = _.get(currentStore, 'errorReducer.error', false);
  //     const loading = _.get(currentStore, 'loadingReducer.loading', false);
  //     const currentUser = _.get(currentStore, 'authReducer.user', false);

  //     if (loading) {
  //       this.setState({loading: loading});
  //     } else {
  //       setTimeout(() => {
  //         this.setState({loading: false})
  //       }, 250);
  //     }
      
  //     if (currentUser) {
  //       this.setState({
  //         user: currentUser
  //       })
  //     } else {

  //     }

  //     if (error) {
  //       console.log('setting error state', errorcounter + 1)
  //       this.setState({error: error});
  //     }
  //   })
  // };

  render() {
    const {error, loading, user} = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="router-wrapper">
            <Switch>
              <WrappedWrapper>
                <Route exact path="/login" component={Login}/>
                <div className={`main-content-wrapper ${loading ? 'loading' : null}`}>
                  <div className="container">
                    <Route exact component={Feed}  path="/" />
                    <Route exact component={Transaction}  path="/transaction/:id" />
                    <Route component={Profile} path="/profile/:id?" />
                    <Route exact component={About}  path="/about" />
                  </div>
                </div>
                </WrappedWrapper>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
};


export default App;
