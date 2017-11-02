import React, { Component } from 'react';

export default class About extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h1>About</h1>
          </div>
        </div>
      </div>
    );
  }
}
