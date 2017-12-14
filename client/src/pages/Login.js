import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';

class Login extends Component {
  state = {
    method: 'login',
    email: '',
    password: '',
    tos: false
  };

  componentDidMount = () => {
    const {dispatch} = this.props;
    window.sessionStorage.token = false;
    dispatch(authActions.logout());
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {history} = this.props;

    if (prevProps !== this.props && _.get(this.props, 'user.token', false)) {
      history.replace('/')
    }
  };

  handleSubmit = (e) => {
    const {dispatch} = this.props;
    const {email, password, method, tos} = this.state;

    e.preventDefault();
    if (method === 'login') {
      if (!email.length || !password.length) {
        dispatch(errorActions.throw('Email or Password fields are not filled in.'))
        return false;
      } else {
        dispatch(errorActions.clear())
        dispatch(authActions.loginUser(email, password));
      }
    } else if (method === 'signup') {
      if (!email.length || !password.length || !tos) {
        dispatch(errorActions.throw('Email, Password or TOS acceptance fields are not filled in.'))
        return false;
      } else {
        dispatch(errorActions.clear())
        dispatch(authActions.signupUser(email, password));
      }
    }
  };

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  };

  handleTOSInput = (e) => {
    this.setState({
      tos: !!e.target.value
    })
  };

  setMethod = (method) => {
    this.setState({
      method: method
    })
  };

  render() {
    const {email, password, method} = this.state;

    return (
      <div className="container h-100 justify-content-center align-items-center">
        <div className="row h-100 justify-content-center align-items-center">
          <div class="col-lg-8">
            <div className="jumbotron mb-0 bg-transparent">
              <h1 className="display-3">Hello, money!</h1>
              <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            </div>
          </div>
          <div class="col-lg-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  onChange={this.handleEmailInput}
                  value={email}
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  />
                {method === 'signup' ? <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> : null}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  onChange={this.handlePasswordInput}
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              {
                method === 'signup' ?
                <div className="form-check">
                  <label className="form-check-label">
                    <input onChange={this.handleTOSInput} type="checkbox" className="form-check-input"/>
                    I agree to the <a href="/terms">terms of service</a>
                  </label>
                </div> : null
              }
              <button type="submit" className="btn btn-primary btn-block">{_.capitalize(method)}</button>
            </form>
            <hr />
            <div className="login-toggle">
              <span
                className={`button-inverse ${method === 'login' ? 'active' : null}`}
                onClick={() => {this.setMethod('login')}}
              >
                Login
              </span>
              <span
                className={`button-inverse ${method === 'signup' ? 'active' : null}`}
                onClick={() => {this.setMethod('signup')}}
              >
                Signup
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Login);
