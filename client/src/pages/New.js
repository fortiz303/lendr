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

  handleSubmit = () => {
    const {dispatch} = this.props;

    dispatch(transactionActions.new(this.state));
  };

  render() {
    return (
      <div>
        <input
          value={this.state.from}
          type="text"
          onChange={(e) => {this.updateField('from', e)}}
          placeholder="from"
        />
        <input
          value={this.state.to}
          type="text"
          onChange={(e) => {this.updateField('to', e)}}
          placeholder="to"
        />
        <input
          value={this.state.amount}
          type="text"
          onChange={(e) => {this.updateField('amount', e)}}
          placeholder="amount"
        />
        <input
          value={this.state.interest}
          type="text"
          onChange={(e) => {this.updateField('interest', e)}}
          placeholder="interest"
        />
        <input
          value={this.state.promise_to_pay_date}
          type="text"
          onChange={(e) => {this.updateField('promise_to_pay_date', e)}}
          placeholder="promise_to_pay_date"
        />
        <input
          value={this.state.memo}
          type="text"
          onChange={(e) => {this.updateField('memo', e)}}
          placeholder="memo"
        />
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
