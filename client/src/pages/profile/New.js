import React, { Component } from 'react';
import {connect} from 'react-redux';

import transactionActions from '../../actions/transactionActions';

import NewLoanEntry from '../../components/NewLoanEntry2';

class New extends Component {
  state = {
    from: '',
    to: '',
    amount: '1000',
    interest: '',
    promise_to_pay_date: '',
    memo: ''
  };

  updateField = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  };

  handleSubmit = (data) => {
    const {dispatch} = this.props;
    console.log(data)
    const transactionData = {
      amount: data.amount,
      interest: data.interest,
      promise_to_pay_date: data.promise_to_pay_date,
      memo: data.memo
    };

    dispatch(transactionActions.new(transactionData, this.props.user.token));
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <NewLoanEntry handleSubmit={this.handleSubmit} />
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
