import React, { Component } from 'react'
import NotificationManager from '../components/NotificationManager';
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    const { shouldDisplayNav, user } = this.props;

    return (
      <div className="navbar">
        {shouldDisplayNav ?
          <div className="col-md-4 col-lg-2">
            <div className="content-wrapper nav-wrapper">
              <NavLink
                to="/"
                exact                
                activeClassName="btn-primary"
                className="nav-item nav-link">
                feed
              </NavLink>
              <NavLink
                to="/profile"
                activeClassName="btn-primary"
                className="nav-item nav-link">
                profile
              </NavLink>
              {false ? <NotificationManager user={user} /> : null}
            </div>
          </div> : null
        }
      </div>
    )
  }
}
