import React, { Component } from 'react'
import LoginForm from './LoginForm';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="row">
          <div className="col">
            <div className="content-wrapper nav">
              <div className="col-lg-2 d-flex align-items-center">
                <pre className="rosco mb-0 text-muted">ROSCO</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
