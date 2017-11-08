import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
// from: req.body.from,
// to: req.body.to,
// amount: req.body.amount,
// status: 'pending',
// interest: req.body.interest,
// promise_to_pay_date: req.body.promise_to_pay_date,
// memo: req.body.memo

import transactionActions from '../actions/transactionActions';
import authActions from '../actions/authActions';

class New extends Component {
  state = {
    from: '',
    to: '',
    amount: '',
    interest: '',
    promise_to_pay_date: '',
    memo: ''
  };

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
    return (
      <div>
        <div className="row">
          <div className="col">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link active" href="#">History</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Edit Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">New Post</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />

        {/* Table Template for history panel*/}
        <div className="row">
          <div className="col">
            <p className="lead">borrowed</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col">
            <p className="lead">loaned</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* end history panel template */}

        {/* profile panel tempalte */}
        <div className="row">
          <div className="col">
            <h1 class="display-3">rating 3.3</h1>
            <p class="lead">You've lent $X times and made $Y dollars! Your rating is on the rise! Keep on keeping on!</p>
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
        {/* end profile panel tempalte */}


        <div className="row">
          <div className="col">
            <h3>new</h3>
            <div className="form-group">
              <input
                value={this.state.amount}
                type="text"
                onChange={(e) => {this.updateField('amount', e)}}
                placeholder="amount"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.interest}
                type="text"
                onChange={(e) => {this.updateField('interest', e)}}
                placeholder="interest"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.promise_to_pay_date}
                type="text"
                onChange={(e) => {this.updateField('promise_to_pay_date', e)}}
                placeholder="promise_to_pay_date"
              />
            </div>
            <div className="form-group">
              <input
                value={this.state.memo}
                type="text"
                onChange={(e) => {this.updateField('memo', e)}}
                placeholder="memo"
              />
            </div>
            <button onClick={() => {this.handleSubmit()}}>Submit</button>
          </div>
        </div>
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

export default connect(mapStateToProps)(New);
