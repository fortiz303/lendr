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
import adminReducer from '../reducers/adminReducer';
import reviewReducer from '../reducers/reviewReducer';

import Login from './Login';
import Feed from './Feed';
import Transaction from './Transaction';
import About from './About';
import Profile from './profile';

import Admin from './Admin';

import Modal from '../components/Modal'
import NotificationManager from '../components/NotificationManager';

import LoginForm from './LoginForm';

// import ioClient from 'socket.io-client'

import particleParams from '../particleParams';
import Particles from 'react-particles-js';

// let io = ioClient();


/* eslint-disable */
const isProduction = false;
/* eslint-enable */

let store;

if (isProduction) {
  store = createStore(
    combineReducers({
      authReducer,
      transactionReducer,
      errorReducer,
      loadingReducer,
      userReducer,
      adminReducer,
      reviewReducer
    }),
    applyMiddleware(thunk)
  );
} else {
  const logger = createLogger({collapsed: true});

  store = createStore(
    combineReducers({
      authReducer,
      transactionReducer,
      errorReducer,
      loadingReducer,
      userReducer,
      adminReducer,
      reviewReducer
    }),
    applyMiddleware(thunk, logger)
  );
}

class Wrapper extends Component {
  componentDidMount = () => {
    const {user, location, dispatch} = this.props;
    const token = _.get(window.sessionStorage, 'token', false);

    if (!user || !token) {
      if (location.pathname !== '/login') {
        const token = _.get(window.sessionStorage, 'token', false);
        if (!token || token === 'false') {
          window.location.pathname = '/login';
        } else {
          dispatch(authActions.authenticate(token));
        }
      }
    }

    // io.on('FETCH_ALL_TRANSACTIONS', (data) => {
    //   dispatch({
    //     type: 'FETCH_ALL_TRANSACTIONS',
    //     data: data
    //   });
    // });

    // io.on('TRANSACTION_LOCKED', function(socket) {
    //   console.log('trans locked', socket)
    // })

    // io.on('TRANSACTION_FREED', function(socket) {
    //   console.log('trans freed', socket)
    // })
  };

  render() {
    const {loading, error, user, modal} = this.props;
    const shouldDisplayNav = !!user;
    const isLoginPage = window.location.pathname === '/login';

    // io.on('connection', function(socket){
    //   console.log('socket connected')
    //   // socket.emit('test_message', {id: 1, test: 'two', random: Math.random()});
    // });
    return (
      <div className={`container-fluid ${isLoginPage ? 'h-100' : null}`}>
        {isLoginPage ?
            <Particles className="particle-wrapper" params={particleParams} width={'100%'} height={'100%'}/> : null
        }
        <Modal active={modal && modal.active} data={modal} />
        {loading ? <div className="loading-bar"></div> : null}
        {
          error ?
            <div className="row">
              <div className={`alert ${error.className}`} role="alert">
                {error.message}
              </div>
            </div>: null
        }

        <div className="row">
          <div className="col">
            <div className="content-wrapper nav">
              <div className="col-lg-2 d-flex align-items-center">
                <pre className="rosco mb-0 text-muted">rosco</pre>
              </div>
              <div className="col d-flex justify-content-end">
                <LoginForm isLoginPage={isLoginPage} />
              </div>
            </div>
          </div>
        </div>
        <div className={`row ${isLoginPage ? 'h-100' : null}`}>
          {shouldDisplayNav ?
            <div className="col-md-4 col-lg-2">
              <div className="content-wrapper nav-wrapper">
                <NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/">feed</NavLink>
                <NavLink activeClassName="btn-primary" className="nav-item nav-link" to="/profile">profile</NavLink>
                {false ? <NotificationManager user={user} /> : null}
              </div>
            </div> : null
          }

          <div className="col justify-content-center">
            <div className="content-wrapper">
              {this.props.children}
            </div>
          </div>
        </div>

        {false ?
          <div className="row">
            <div className="col">
              <div className="content-wrapper nav">
                <div className="col-lg-2 d-flex align-items-center">
                  <pre className="rosco mb-0 text-muted">rosco</pre>
                </div>
                <div className="col d-flex justify-content-end">
                  <p>Footer footer footer</p>
                </div>
              </div>
            </div>
          </div> : null
        }

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
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="router-wrapper">
            <Switch>
              <WrappedWrapper>
                <Route exact path="/login" component={Login}/>
                <div className="main-content-wrapper">
                  <div className="container">
                    <Route exact component={Feed}  path="/" />
                    <Route exact component={Transaction}  path="/transaction/:id" />
                    <Route component={Profile} path="/profile/:id?" />
                    <Route exact component={About} path="/about" />
                    <Route exact component={Admin} path="/admin" />
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
