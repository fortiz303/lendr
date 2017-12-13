import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class TransactionItem extends Component {
  render() {
    const {
      isLocked,
      data,
      createdByCurrentUser,
      borrowLendString,
      openRepaymentModal
    } = this.props;

    const classes = [
      'card',
      'feed-card',
      isLocked ? 'locked' : null,
      data.status === 'settled' ? 'settled' : null
    ].join(' ');
    return (
      <div className={classes}>
        <div className="card-body">
          <h4 className="card-title text-primary">${data.amount} <small>for</small> ${data.interest}</h4>
          <p className="card-subtitle mb-2 text-muted">promise to pay by: {new Date(data.promise_to_pay_date).toLocaleDateString()}</p>
          <p className="card-text">{data.memo}</p>
        </div>
          <div className="card-footer bg-transparent">
            <span className="card-link">
              <Link to={`/profile/${data.created_by_user_id}`}>
                {createdByCurrentUser ? 'my profile' : 'view user'}
              </Link>
            </span>
          </div>
          {
            !isLocked ? 
              <div className="card-footer bg-transparent">
                <span className="card-link">
                  <Link to={`/transaction/${data.id}`}>loan details</Link>
                </span>
              </div>: null
           }
           {
             createdByCurrentUser && data.status === 'pending' && borrowLendString === 'borrowed' ?
               <div className="card-footer bg-transparent">
                 <span onClick={() => {openRepaymentModal(data.id), (data.amount + data.interest)}} className="card-link">
                 <a href="#">repay </a>
                 </span>
               </div> : null
           }
      </div>
    );
  }
};
