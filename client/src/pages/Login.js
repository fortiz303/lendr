import { get } from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import authActions from '../actions/authActions';

class Login extends Component {
  componentDidMount = () => {
    const {dispatch} = this.props;
    window.sessionStorage.token = false;
    dispatch(authActions.logout());
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {history} = this.props;

    if (prevProps !== this.props && get(this.props, 'user.token', false)) {
      history.replace('/')
    }
  };

  render() {
    return (
      <div className="container align-items-center">
        Login
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
