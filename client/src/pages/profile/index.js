import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'

import transactionActions from '../../actions/transactionActions';
import authActions from '../../actions/authActions';

import History from './History';
import New from './New';
import Update from './Update';

class Profile extends Component {
  updateField = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  };

  componentDidMount = () => {
    const {dispatch} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    if (token) {
      dispatch(authActions.authenticate(token));
    }

  };
  handleSubmit = () => {
    const {dispatch} = this.props;

    const transactionData = {
      amount: this.state.amount,
      interest: this.state.interest,
      promise_to_pay_date: this.state.promise_to_pay_date,
      memo: this.state.memo
    };

    dispatch(transactionActions.new(transactionData, this.props.user.token));
  };

  render() {
    const {match} = this.props;
    return (
      <div className="settings-wrapper">
        <div className="row">
          <div className="col">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-item nav-link"
                  to="/profile/history"
                >
                  History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-item nav-link"
                  to="/profile/new"
                >
                  New
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-item nav-link"
                  to="/profile/update"
                >
                  Edit Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link Bank Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />

       <Route
        exact
        component={History}
        path={`${match.url}`}
        />
       <Route
        exact
        component={History}
        path={`${match.url}/history`}
        />
       <Route
        exact
        component={Update}
        path={`${match.url}/update`}
        />
       <Route
        exact
        component={New}
        path={`${match.url}/new`}
        />

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Profile);
