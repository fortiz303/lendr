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
    const {dispatch, history} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);
    if (token) {
      dispatch(transactionActions.fetchAll(token));
    }
  };

  renderTransactionFeed = () => {
    const {transactionFeed} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      return (
        <p key={index}>Transaction ID: <strong>{current.id}</strong> from <strong>{current.from}</strong> to <strong>{current.to}</strong> has a status: <strong>{current.status}</strong></p>
      )
    }) : null
  };
  render() {
    return this.renderTransactionFeed()
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
