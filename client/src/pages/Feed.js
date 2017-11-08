import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';

import authActions from '../actions/authActions';
import transactionActions from '../actions/transactionActions';

class Feed extends Component {
  state = {

  };

  componentDidMount = () => {
    const {dispatch, history, user} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
  
    if (token) {
      dispatch(authActions.authenticate(token));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch} = this.props;

    if (_.get(prevProps, 'user.uid', false) !== user.uid && user.token) {
      dispatch(transactionActions.fetchAll(user.token));    
    }
  };
  
  acceptTransaction = (transactionId) => {
    const {dispatch, user} = this.props;
    
    const updateData = {
      transactionId: transactionId,
      accepted_by_user_id: user.uid
    };

    dispatch(transactionActions.accept(updateData, user.token))
  };

  renderTransactionFeed = () => {
    const {transactionFeed, user} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      return (
        <tr key={`feed-table-row-${index}`}>
          <td>{current.created_at}</td>
          <td>{current.amount}</td>
          <td>{current.interest}</td>
          <td>{current.amount + current.interest}</td>
          <td>{current.memo}</td>
          <td>{current.status}</td>
          <td>
            {
              current.user_id !== user.uid ?
                <span onClick={() => {this.acceptTransaction(current.id)}} className="btn btn-primary">Loan</span> :
                <span className="btn btn-secondary">Edit</span>
            }
          </td>
        </tr>
      )
    }) : null
  };
  render() {
    const {user} = this.props;
    return (
      <div className="col">
        <h2>Hello {_.get(user, 'email', '')}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date posted</th>
              <th>Amount requested</th>
              <th>Interest</th>
              <th>Your total return</th>
              <th>For</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactionFeed()}
          </tbody>
        </table>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transactionFeed: state.transactionReducer.transactionFeed
  }
};

export default connect(mapStateToProps)(Feed);
