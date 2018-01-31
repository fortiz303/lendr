import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Route, NavLink} from 'react-router-dom'

import userActions from '../../actions/userActions';

import History from './History';
import New from './New';
import Update from './Update';

class Profile extends Component {

  componentDidMount = () => {
    const {dispatch, match, user} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    const id = _.get(match, 'params.id', false) || _.get(user, 'id', false);

    if (token && id) {
      dispatch(userActions.fetchById(id, token));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {dispatch, user, match} = this.props;
    const id = _.get(match, 'params.id', false) || _.get(user, 'id', false);

    if (prevProps.user !== this.props.user && id && user.token) {
      dispatch(userActions.fetchById(id, user.token));
    }
  };

  render() {
    const {match, user, profile, dwollaUser} = this.props;

    // am I looking at myself? if so, enable settings stuff
    const isUser = user && profile && user.id === profile.id;

    const foundUser = !!profile;
    const notFound = <p className="lead text-center">loading</p>;
    return foundUser && user && user.id ?
      <div>
        {dwollaUser ? <p>Verified!</p> : null}
        <div className="row">
          <div className="col">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <NavLink
                  activeClassName="active border border-primary bg-white text-primary"
                  className="nav-item nav-link"
                  to={`/profile/${user.id}/history`}
                >
                  history
                </NavLink>
              </li>
              {
                isUser ?
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active border border-primary bg-white text-primary"
                      className="nav-item nav-link"
                      to={`/profile/${user.id}/new`}
                    >
                      new
                    </NavLink>
                  </li> : null
              }
              {
                isUser ?
                  <li className="nav-item">
                    <NavLink
                      activeClassName="active border border-primary bg-white text-primary"
                      className="nav-item nav-link"
                      to={`/profile/${user.id}/update`}
                    >
                      settings
                    </NavLink>
                  </li> : null
              }
              {
                false ?
                  <li className="nav-item">
                    <a className="nav-link" href="#">link bank account</a>
                  </li> : null
              }
              {
                false ?
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">help</a>
                  </li> : null
              }
            </ul>
          </div>
        </div>
        <hr />

        <Route
          isUser={isUser}
          exact
          component={History}
          user={profile}
          path={`${match.url}`}
        />
        <Route
          isUser={isUser}
          exact
          component={History}
          path={`${match.url}/history`}
        />
        {
          isUser ?
            <Route
              isUser={isUser}
              exact
              component={Update}
              path={`${match.url}/update`}
            /> :
            null
        }
        {
          isUser ?
          <Route
            isUser={isUser}
            exact
            component={New}
            path={`${match.url}/new`}
          /> :
          null
        }

      </div> : notFound;
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    profile: state.userReducer.profile,
    dwollaUser: state.userReducer.dwollaUser
  }
};

export default connect(mapStateToProps)(Profile);
