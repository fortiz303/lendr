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
    window.sessionStorage.token = false;
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
    const {error} = this.props;

    return (
      <div className="container h-100">
        {
          error ?
            <div className="alert alert-danger" role="alert">
              {error}
            </div> : null
        }
        <div className="row h-100 justify-content-center align-items-center">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${method === 'login' ? 'active' : null}`}
                    onClick={() => {this.setMethod('login')}}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${method === 'signup' ? 'active' : null}`}
                    onClick={() => {this.setMethod('signup')}}
                  >
                    Signup
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h4 className="card-title">{method}</h4>
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
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
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
    user: state.authReducer.user,
    error: state.errorReducer.error
  }
};

export default connect(mapStateToProps)(Login);
