import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import transactionActions from '../../actions/transactionActions';
import errorActions from '../../actions/errorActions';

class History extends Component {
  componentDidMount = () => {
    const {dispatch, profile, match, user, router} = this.props;

    const token = user.token;
    const id = profile.id;

    if (token) {
      dispatch(transactionActions.fetchAllBorrowedForUser(id, token));
    }
  };
  
  openRepaymentModal = (transactionId, transactionAmount) => {
    const {dispatch} = this.props;

    dispatch(errorActions.modal({
      type: 'MODAL',
      // data: {
        active: true,
        closeFunc: this.closeModal,
        actionFunc: this.repayLoan,
        bodyContent: (
          <div className="modal-body">
            <p>Are you sure you want to repay this loan?</p>
            <p>{transactionAmount} will be withdrawn from your account</p>
          </div>
        ),
        headerContent: (
          <h5 className="modal-title" id="exampleModalLabel">Repay</h5>
        ),
        closeComponent: (
          <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        ),
        actionComponent: (
          <button onClick={() => {this.repayLoan(transactionId)}} type="button" className="btn btn-primary">Repay!</button>
        )
      // }
    }));
  };
  
  repayLoan = (transactionId) => {
    const {dispatch, user} = this.props;

    dispatch(transactionActions.repay(transactionId, user.token));
  };

  closeModal = () => {
    const {dispatch} = this.props;
    dispatch(errorActions.modal({type: 'MODAL', active: false}));
  };
  
  renderHistory = (historyObject, borrowLendString) => {
    const {isUser} = this.props;

    return historyObject && historyObject.length ? historyObject.map((current, index) => {
      return (
        <div className={`card feed-card ${current.status === 'settled' ? 'settled' : null}`} key={`${index}-${current.id}-card`}>
          <div key={`${index}-table-row`} className="card-body">
            <h4 className="card-title text-primary">${current.amount} <small>{borrowLendString} for</small> ${current.interest}</h4>
            <p className="card-subtitle mb-2 text-muted">Repaid by: {new Date(current.promise_to_pay_date).toLocaleDateString()}</p>
            {current.status === 'settled' ? <p className="card-subtitle mb-2 text-muted">Settled on: {new Date(current.settled_on).toLocaleDateString()}</p> : null}
            <p className="card-text">{current.status}</p>
             {
               isUser ? 
                 <ul className="list-group list-group-flush">
                   <li className="list-group-item">
                     <span onClick={() => {this.acceptTransaction(current.id)}} className="card-link">
                       <Link to={`/transaction/${current.id}`}>details <span className="oi oi-arrow-right text-primary"></span></Link>
                     </span>
                   </li>
                </ul> : null
            }
            {
              !isUser && current.status === 'pending' ?
                 <ul className="list-group list-group-flush">
                   <li className="list-group-item">
                     <span onClick={() => {this.openRepaymentModal(current.id), (current.amount + current.interest)}} className="card-link">
                       repay <span className="oi oi-arrow-right text-primary"></span>
                     </span>
                   </li>
                </ul> : null
            }
          </div>
        </div>
      )
    }) : <p className="lead">nothing {borrowLendString}</p>
  };

  render() {
    const {isUser, borrowHistory, lendHistory} = this.props;
    console.log(this.props)
    return (
      <div className="row">
        <div className="col">
          <div className="card-columns">
            {this.renderHistory(borrowHistory, 'borrowed')}
          </div>
          <hr />
          <div className="card-columns">
            {this.renderHistory(lendHistory, 'loaned')}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    profile: state.userReducer.profile,
    borrowHistory: state.transactionReducer.borrowHistory,
    lendHistory: state.transactionReducer.lendHistory
  }
};

export default connect(mapStateToProps)(History);
