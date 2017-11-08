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
        <div className="card">
          <div class="card-header">{current.status}</div>
          <div className="card-body">
            <h4 className="card-title">${current.amount} with ${current.interest} interest</h4>
            <h6 className="card-subtitle mb-2 text-muted">Repaid by: {new Date(current.promise_to_pay_date).toLocaleString()}</h6>
            <p className="card-text">{current.memo}</p>
            <p className="card-subtitle mb-2 text-muted"><small>Posted on: {new Date(current.created_at).toLocaleString()}</small></p>
          </div>
            <ul class="list-group list-group-flush">
             <li class="list-group-item"><a onClick={() => {this.acceptTransaction(current.id)}} className="card-link">View Details of Loan</a></li>
             <li class="list-group-item"><a href="#" className="card-link">View Profile of Poster</a></li>
           </ul>
        </div>
      )
    }) : null
  };
  render() {
    const {user} = this.props;
    return (
      <div className="col">
        <div className="card-columns">
          {this.renderTransactionFeed()}
        </div>
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
