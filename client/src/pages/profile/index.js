import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'

import authActions from '../../actions/authActions';

import History from './History';
import New from './New';
import Update from './Update';

class Profile extends Component {

  componentDidMount = () => {
    const {dispatch} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    if (token) {
      dispatch(authActions.authenticate(token));
    }

  };

  render() {
    const {match} = this.props;
    return (
      <div className="content-wrapper">
        <h1 className="display-2 text-primary">
          hello there
        </h1>
        <p className="lead">current rating: <strong>4.5</strong><br />
        You've lent $960 over the past month and made $125 dollars!</p>
        <hr />
        <div className="row">
          <div className="col">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <NavLink
                  activeClassName="active border border-primary bg-white text-primary"
                  className="nav-item nav-link"
                  to="/profile/history"
                >
                  History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active border border-primary bg-white text-primary"
                  className="nav-item nav-link"
                  to="/profile/new"
                >
                  New
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active border border-primary bg-white text-primary"
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
