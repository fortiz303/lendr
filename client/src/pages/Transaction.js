import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import transactionActions from '../actions/transactionActions';
import authActions from '../actions/authActions';

class Transaction extends Component {
  state = {
    hasAcceptedTransaction: false
  };

  componentDidMount = () => {
    const {dispatch, transactionFeed, match} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);

    if (token) {
      dispatch(authActions.authenticate(token));
      const id = _.get(match, 'params.id', false);
      if (token && !transactionFeed && id) {
        dispatch(transactionActions.fetchById(id, token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transaction} = this.props;
        const token = _.get(window.sessionStorage, 'token', false);
    if (prevProps.transaction !== transaction && transaction && transaction.status !== 'locked' && token) {
      dispatch(transactionActions.lock(transaction.id, token))
    }
  };

  componentWillUnmount = () => {
    const {dispatch, transaction} = this.props;
    const {hasAcceptedTransaction} = this.state;
    const token = _.get(window.sessionStorage, 'token', false);
    if (!hasAcceptedTransaction && token) {
      dispatch(transactionActions.free(transaction.id, token));
    }
  };

  acceptTransaction = () => {
    const {dispatch, transaction} = this.props;

  }
  // accepted_by_user_id: null
  // amount: 10000
  // created_at: "2017-11-08T02:34:12.439Z"
  // created_by_user_id: 1
  // id: 4
  // interest: 1000
  // memo: "memo 5"
  // promise_to_pay_date: "2017-12-31T08:00:00.000Z"
  // seen_by_recipient: false
  // seen_by_sender: false
  // status: "accepted"

  render() {
    const {transaction} = this.props;
    return transaction ? 
      <div className="content-wrapper">
        <p className="lead">Transaction details</p>
        <p>Status: {transaction.status}</p>
        <hr />
        <div className="row">
          <div className="col">
            <p>User: {transaction.created_by_user_id} wants to borrow {transaction.amount} and pay back {transaction.interest} by {transaction.promise_to_pay_date}</p>
            <p>{transaction.memo}</p>
            
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <Link className="btn btn-primary" to={`/profile/${transaction.created_by_user_id}`}>View User</Link>
            <a className="btn btn-primary" onClick={this.acceptTransaction}>Accept Transaction</a>
          </div>
        </div>
      </div> : null
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transaction: state.transactionReducer.transaction
  }
};

export default connect(mapStateToProps)(Transaction);