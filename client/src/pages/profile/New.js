import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

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
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(New);
