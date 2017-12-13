import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';

import adminActions from '../actions/adminActions';

class Admin extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch} = this.props;

    if (user !== prevProps.user && user.token) {
      dispatch(adminActions.init(user.token));
    }
  };

  renderUsers = () => {
    const {admin} = this.props;

    const rows = _.get(admin, 'users', []).map((current, index) => {
      return (
        <tr key={`${index}-user-row`}>
          <td>{current.id}</td>
          <td>{current.user_name}</td>
          <td>{current.email}</td>
          <td>{current.verified}</td>
          <td>{current.connected_to_dwolla}</td>
          <td>{current.user_rating}</td>
          <td>{current.nick}</td>
          <td>{current.password}</td>
          <td>{current.created_at}</td>
          <td>{current.friends}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover table-sm table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>user_name</th>
            <th>email</th>
            <th>verified</th>
            <th>connected_to_dwolla</th>
            <th>user_rating</th>
            <th>nick</th>
            <th>password</th>
            <th>created_at</th>
            <th>friends</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  };

  renderTransactions = () => {
    const {admin} = this.props;

    const rows = _.get(admin, 'transactions', []).map((current, index) => {
      return (
        <tr key={`${index}-transaction-row`}>
          <td>{current.id}</td>
          <td>{current.amount}</td>
          <td>{current.interest}</td>
          <td>{current.promise_to_pay_date}</td>
          <td>{current.memo}</td>
          <td>{current.status}</td>
          <td>{current.created_at}</td>
          <td>{current.created_by_user_id}</td>
          <td>{current.accepted_by_user_id}</td>
          <td>{current.seen_by_recipient}</td>
          <td>{current.seen_by_sender}</td>
          <td>{current.locked_on_timestamp}</td>
          <td>{current.settled_on}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover table-sm table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>amount</th>
            <th>interest</th>
            <th>promise_to_pay_date</th>
            <th>memo</th>
            <th>status</th>
            <th>created_at</th>
            <th>created_by_user_id</th>
            <th>accepted_by_user_id</th>
            <th>seen_by_recipient</th>
            <th>seen_by_sender</th>
            <th>locked_on_timestamp</th>
            <th>settled_on</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <p className="lead">Transactions</p>
          {this.renderTransactions()}
          <p className="lead">Users</p>
          {this.renderUsers()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transactionFeed: state.transactionReducer.transactionFeed,
    admin: state.adminReducer.admin
  }
};

export default connect(mapStateToProps)(Admin);
