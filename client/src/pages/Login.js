import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import authActions from '../actions/authActions';

class Login extends Component {
  state = {
    method: 'login',
    email: '',
    password: ''
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {history} = this.props;

    if (prevProps !== this.props && _.get(this.props, 'user.token', false)) {
      history.replace('/')
    }
  };

  handleSubmit = (e) => {
    const {dispatch} = this.props;
    const {email, password, method} = this.state;

    e.preventDefault();
    if (method === 'login') {
      dispatch(authActions.loginUser(email, password));
    } else if (method === 'signup') {
      dispatch(authActions.signupUser(email, password));
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

  setMethod = (method) => {
    this.setState({
      method: method
    })
  };

  render() {
    const {email, password, method} = this.state;

    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="card" style={{width: '20rem'}}>
            <div className="card-body">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a onClick={() => {this.setMethod('login')}} className={`nav-link ${method === 'login' ? 'active' : null}`} href="#">Login</a>
                </li>
                <li className="nav-item">
                  <a onClick={() => {this.setMethod('signup')}} className={`nav-link ${method === 'signup' ? 'active' : null}`} href="#">Signup</a>
                </li>
              </ul>
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
                {/*<div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input"/>
                    Check me out
                  </label>
                </div>*/}
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
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Login);
