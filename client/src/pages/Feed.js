import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import authActions from '../actions/authActions';
import transactionActions from '../actions/transactionActions';
import TransactionItem from '../components/TransactionItem';

class Feed extends Component {
  state = {

  };

  componentDidMount = () => {
    const {dispatch, transactionFeed} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);

    if (token && !transactionFeed) {
      dispatch(transactionActions.fetchAll(token));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transactionFeed} = this.props;

    if (_.get(prevProps, 'user.id', false) !== _.get(user, 'id', false) && user.token && transactionFeed !== prevProps.transactionFeed) {
      dispatch(transactionActions.fetchAll(user.token));
    }
  };

  renderTransactionFeed = () => {
    const {transactionFeed, user} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      const isLocked = current.status === 'locked';

      // was the card made by me?
      const createdByCurrentUser = _.get(current, 'created_by_user_id', true) === _.get(user, 'id', false); 
      return (
        <TransactionItem
          data={current}
          isLocked={isLocked}
          createdByCurrentUser={createdByCurrentUser}
        />
      )
    }) : null
  };
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card-columns">
            {this.renderTransactionFeed()}
          </div>
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
