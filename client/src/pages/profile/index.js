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
import userActions from '../../actions/userActions';

import History from './History';
import New from './New';
import Update from './Update';

class Profile extends Component {

  componentDidMount = () => {
    const {dispatch, profile, match, user, router, history} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    console.log(user)
    if (token) {
      const id = _.get(match, 'params.id', false);
      if (token && !profile && id) {
        dispatch(userActions.fetchById(id, token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {dispatch, profile, user, history, match} = this.props;

    const id = _.get(match, 'params.id', false);

    if (_.get(prevProps, 'match.params.id', 'a') !== _.get(this.props, 'match.params.id', 'b') && _.get(user, 'token') && id) {
      // navigated to a new user - fetch new users profile
      dispatch(userActions.fetchById(id, user.token))
    } else if (_.get(prevProps, 'user.id') !== _.get(user, 'id') && _.get(user, 'token')) {
      dispatch(userActions.fetchById(user.id, user.token))
    }
    // if (prevProps.location !== this.props.location && user.token) {
    //   debugger
    //   dispatch(userActions.fetchById(id, user.token));
    // }
  };
  // componentDidUpdate = (prevProps, prevState) => {
  //   const {dispatch, profile, match, user, history} = this.props;
  //   const id = _.get(match, 'params.id', false);

  //   if (prevProps.user !== this.props && !user || !profile && !id) {
  //     dispatch(userActions.fetchById(id, token));
  //   }
  // };
  render() {
    const {match, user, profile} = this.props;

    // am I looking at myself? if so, enable settings stuff
    const isUser = user && profile && user.id === profile.id;

    const foundUser = !!profile;
    const notFound = 
      <div className="content-wrapper"><p className="lead">loading</p></div>;

    return foundUser && user ?
      <div className="content-wrapper">
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
                      edit profile
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
    profile: state.userReducer.profile
  }
};

export default connect(mapStateToProps)(Profile);
