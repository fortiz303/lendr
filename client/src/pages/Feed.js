import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import authActions from '../actions/authActions';
import transactionActions from '../actions/transactionActions';

class Feed extends Component {
  state = {

  };

  componentDidMount = () => {
    const {dispatch, transactionFeed} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);

    if (token) {
      dispatch(authActions.authenticate(token));

      if (token && !transactionFeed) {
        dispatch(transactionActions.fetchAll(token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transactionFeed} = this.props;

    if (_.get(prevProps, 'user.uid', false) !== _.get(user, 'uid', false) && user.token && transactionFeed !== prevProps.transactionFeed) {
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
    const {transactionFeed} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      return (
        <div className="card feed-card" key={`feed-card-${index}-${current.created_at}`}>
          <div className="card-body">
            <h4 className="card-title text-primary">${current.amount} <small>for</small> ${current.interest}</h4>
            <p className="card-subtitle mb-2 text-muted">Repaid by: {new Date(current.promise_to_pay_date).toLocaleString()}</p>
            <p className="card-text">{current.memo}</p>
          </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span onClick={() => {this.acceptTransaction(current.id)}} className="card-link">
                  <Link to={`/transaction/${current.id}`}>View Details of Loan <span class="oi oi-arrow-right text-primary"></span></Link>
                </span>
              </li>
             <li className="list-group-item"><span className="card-link">View Profile of Poster <span class="oi oi-arrow-right text-primary"></span></span></li>
           </ul>
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
