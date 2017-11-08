import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

class Update extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <h1 className="display-3">rating 3.3</h1>
          <p className="lead">You've lent $X times and made $Y dollars! Your rating is on the rise! Keep on keeping on!</p>
          <hr />
          <p className="lead">Update your settings</p>
          <form>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="text" readOnly disabled className="disabled form-control-plaintext" id="staticEmail" value="email@example.com" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Change Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputNick" className="col-sm-2 col-form-label">Nick Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" id="inputNick" value="optional..." />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputNick" className="col-sm-2 col-form-label">Nick Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" id="inputNick" value="optional..." />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputNick" className="col-sm-2 col-form-label">Nick Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" id="inputNick" value="optional..." />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputNick" className="col-sm-2 col-form-label">Nick Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" id="inputNick" value="optional..." />
              </div>
            </div>
          </form>
        </div>
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

export default connect(mapStateToProps)(Update);
