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
      <div className="col">
        <div className="row">
          <div className="col">
            <h2>Hello...</h2>
          </div>
        </div>



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
