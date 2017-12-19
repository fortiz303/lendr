import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import transactionActions from '../../actions/transactionActions';
import reviewActions from '../../actions/reviewActions';
import errorActions from '../../actions/errorActions';
import TransactionItem from '../../components/TransactionItem';
import RatingsComponent from '../../components/RatingsComponent';

class History extends Component {
  componentDidMount = () => {
    const {dispatch, profile, user} = this.props;

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
    }));
  };
  
  rateUser = (data) => {
    const {dispatch, user} = this.props;

    dispatch(reviewActions.postReview(data, user.token));
  };

  openRatingsModal = (data) => {
    const {dispatch, user} = this.props;

    dispatch(errorActions.modal({
      type: 'MODAL',
      active: true,
      closeFunc: this.closeModal,
      actionFunc: this.rateUser,
      headerContent: (
        <h5 className="modal-title" id="exampleModalLabel">Rate your experience</h5>
      ),
      bodyContent: (
        <div className="modal-body">
          <RatingsComponent onSubmit={this.rateUser} transactionData={data} userData={user} />
        </div>
      ),
      // closeComponent: (
      //   <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      // ),
      // actionComponent: (
      //   <button onClick={this.rateUser} type="button" className="btn btn-primary">Repay!</button>
      // )
    }))
  }

  repayLoan = (transactionId) => {
    const {dispatch, user} = this.props;

    dispatch(transactionActions.repay(transactionId, user.token));
  };

  closeModal = () => {
    const {dispatch} = this.props;
    dispatch(errorActions.modal({type: 'MODAL', active: false}));
  };

  renderHistory = (historyObject, borrowLendString) => {
    const {isUser, user} = this.props;
    return historyObject && historyObject.length ? historyObject.map((current, index) => {
      return (
        <TransactionItem
          key={`${index}-${borrowLendString}-history-transaction-item`}
          data={current}
          isLocked={current.status === 'isLocked'}
          createdByCurrentUser={current.created_by_user_id === user.id}
          borrowLendString={borrowLendString}
          openRepaymentModal={this.openRepaymentModal}
          openRatingsModal={this.openRatingsModal}
        />
      )
    }) :
    <div className="card feed-card">
      <div className="card-body">
        <p className="lead">there's nothing here yet!</p>
        <p>Lend someone in need some money or request a loan from the community!</p>
        <Link to="/">go take a look!</Link>
      </div>
    </div>
  };

  render() {
    const {borrowHistory, lendHistory} = this.props;
    return (
      <div className="row">
        <div className="col">
          <h5>money borrowed</h5>
          <div className="card-deckzzzz">
            {this.renderHistory(borrowHistory, 'borrowed')}
          </div>
        </div>
        <div className="col">
          <h5>money loaned</h5>
          <div className="card-deckzzzz">
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
