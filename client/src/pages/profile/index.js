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
    const {dispatch, profile, match, user, router} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    if (token) {
      dispatch(authActions.authenticate(token));

      const id = _.get(match, 'params.id', false);
      if (token && !profile && id) {
        dispatch(userActions.fetchById(id, token));
      }
    }
  };
  // componentDidUpdate = (prevProps, prevState) => {
  //   const {dispatch, profile, match, user, history} = this.props;
  //   const id = _.get(match, 'params.id', false);

  //   if (prevProps !== this.props && !user || !profile && !id) {
  //     history.push(`/profile/${user.id}`)
  //   }
  // }
  render() {
    const {match, user, profile} = this.props;
    
    // am I looking at myself? if so, enable settings stuff
    console.log(match.url)
    const isUser = user && profile && user.id === profile.id;
    const foundUser = !!profile;
    const notFound = <div className="content-wrapper"><h1 className="display-2 text-primary">user not found</h1></div>;
    return foundUser && user ? 
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
                isUser ?
                  <li className="nav-item">
                    <a className="nav-link" href="#">link bank account</a>
                  </li> : null
              }
              {
                isUser ?
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">help</a>
                  </li> : null
              }
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
        {
          isUser ?
            <Route
              exact
              component={Update}
              path={`${match.url}/update`}
            /> :
            null
        }
        {
          isUser ?
          <Route
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
