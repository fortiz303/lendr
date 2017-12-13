import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import transactionActions from '../actions/transactionActions';

class Feed extends Component {
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
    const {transactionFeed} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      const isLocked = current.status === 'locked';
      return (
        <div className={`card feed-card ${isLocked ? 'locked' : null}`} key={`${current.id}-feed-card-${index}-${current.created_at}`}>
          <div className="card-body">
            <h4 className="card-title text-primary">${current.amount} <small>for</small> ${current.interest}</h4>
            <p className="card-subtitle mb-2 text-muted">Repaid by: {new Date(current.promise_to_pay_date).toLocaleDateString()}</p>
            <p className="card-text">{current.memo}</p>
          </div>
            {
              !isLocked ?
                <div className="card-footer bg-transparent">
                  <span className="card-link">
                    <Link to={`/transaction/${current.id}`}>details <span className="oi oi-arrow-right text-primary"></span></Link>
                  </span>
                </div>: null
             }
        </div>
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
