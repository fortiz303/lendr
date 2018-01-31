import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';

class Login extends Component {
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



  render() {
    return (
      <div className="container align-items-center">

        {/*<div className="row align-items-center">
          <div className="col-lg-8">
            <div className="row align-items-center">
              <div className="jumbotron mb-0 bg-transparent">
                <h1 className="display-3">Hello, money!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <img src="https://www.placehold.it/300x300" />
          </div>
        </div>

        <hr />

        <div className="row align-items-center">
          <div className="col-lg-4">
            <img src="https://www.placehold.it/300x300" />
          </div>
          <div className="col-lg-8">
            <div className="row align-items-center">
              <div className="jumbotron mb-0 bg-transparent">
                <h1 className="display-3">Hello, money!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              </div>
            </div>
          </div>
        </div>

        <hr />*/}
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
