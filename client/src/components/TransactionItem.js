import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class TransactionItem extends Component {
  static defaultProps = {
    showRepaymentButton: true,
    showDetailsButton: true,
    showRatingsButton: true
  };

  render() {
    const {
      isLocked,
      data,
      createdByCurrentUser,
      borrowLendString,
      openRepaymentModal,
      openRatingsModal,
      showRepaymentButton,
      showDetailsButton,
      showRatingsButton
    } = this.props;

    const classes = [
      'card',
      'feed-card',
      isLocked ? 'locked' : null,
      data.status === 'settled' ? 'settled' : null
    ].join(' ');

    const textClasses = [
      isLocked ? 'text-danger' : null,
      data.status === 'settled' ? 'text-success' : null,
      data.status === 'pending' ? 'text-primary' : null
    ].join(' ');

    return (
      <div className={classes}>
        <div className="card-body">
          <h4 className={`card-title ${textClasses}`}>${data.amount} <small>for</small> ${data.interest}</h4>
          <p className="card-subtitle mb-2 text-muted">promise to pay by: {new Date(data.promise_to_pay_date).toLocaleDateString()}</p>
          <p className="card-text">{data.memo}</p>
        </div>

          <div className="list-group">
              <Link className={`${textClasses} list-group-item list-group-item-action`} to={`/profile/${data.created_by_user_id}`}>
                {createdByCurrentUser ? 'my profile' : 'view user'}
              </Link>

          {
            !isLocked && showDetailsButton ?
                <Link className={`${textClasses} list-group-item list-group-item-action`} to={`/transaction/${data.id}`}>loan details</Link> : null
           }
           {
            showRatingsButton && !createdByCurrentUser && borrowLendString === 'loaned' && data.status === 'settled' ?
                <a onClick={() => {openRatingsModal(data)}} className={`${textClasses} list-group-item list-group-item-action`} href="#">rate experience </a> : null
           }
           {
             showRepaymentButton && createdByCurrentUser && data.status !== 'locked' && data.status !== 'settled' && borrowLendString === 'borrowed' ?
                 <a onClick={() => {openRepaymentModal(data.id, (data.amount + data.interest))}} className={`${textClasses} list-group-item list-group-item-action`} href="#">repay </a> : null
           }
          </div>
        </div>
    );
  }
};
