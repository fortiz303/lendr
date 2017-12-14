import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import transactionActions from '../actions/transactionActions';
import errorActions from '../actions/errorActions';

class Transaction extends Component {
  state = {
    hasAcceptedTransaction: false,
    modal: false,
    allowedToLockUnlock: true
  };

  componentDidMount = () => {
    const {dispatch, transactionFeed, match} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);

    if (token) {
      const id = _.get(match, 'params.id', false);
      if (token && !transactionFeed && id) {
        dispatch(transactionActions.fetchById(id, token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transaction} = this.props;
    const token = _.get(window.sessionStorage, 'token', false);
    if (prevProps.transaction !== this.props.transaction) {
      if (transaction.status !== 'pending') {
        this.setState({
          allowedToLockUnlock: false
        })
      }
    }
    if (prevState.hasAcceptedTransaction !== this.state.hasAcceptedTransaction) {
      this.closeModal()
    }
  };

  componentWillUnmount = () => {
    const {dispatch, transaction} = this.props;
    const {hasAcceptedTransaction, allowedToLockUnlock} = this.state;
    const token = _.get(window.sessionStorage, 'token', false);
    
    // this is very wrong
    if (!hasAcceptedTransaction && token && allowedToLockUnlock) {
      dispatch(transactionActions.free(transaction.id, token));
    }
  };

  acceptTransaction = () => {
    const {dispatch, transaction, user} = this.props;
    dispatch(transactionActions.accept(transaction.id, user.token, user.id));
    this.setState({
      hasAcceptedTransaction: true
    })
  };

  openModal = () => {
    const {dispatch, transaction, user} = this.props;

    this.setState({
      modal: true
    });

    if (user) {
      dispatch(errorActions.modal({
        type: 'MODAL',
        active: true,
        closeFunc: this.closeModal,
        actionFunc: this.acceptTransaction,
        bodyContent: (
          <div className="modal-body">
            <p>Are you sure you want to lend this money?</p>
            <a href="#">Make sure to read our guidelines and terms of service</a>
          </div>
        ),
        headerContent: (
          <h5 className="modal-title" id="exampleModalLabel">Send ${transaction.amount}?</h5>
        ),
        closeComponent: (
          <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        ),
        actionComponent: (
          <button onClick={this.acceptTransaction} type="button" className="btn btn-primary">Send money!</button>
        )
      }));
      dispatch(transactionActions.lock(transaction.id, user.token));
    }
  };

  closeModal = () => {
    const {dispatch, transaction, user} = this.props;
    const {hasAcceptedTransaction} = this.state;

    // this.setState({
    //   modal: false
    // });
    dispatch(errorActions.modal({
      type: 'MODAL',
      active: false
    }))
    if (!hasAcceptedTransaction && user) {
      dispatch(transactionActions.free(transaction.id, user.token));
    }
  };

  renderModal = () => {
    const {transaction} = this.props;

    return (
      <div style={{display: 'block'}}className="modal show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Send ${transaction.amount}?</h5>
              <button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to lend this money?</p>
              <a href="#">Make sure to read our guidelines and terms of service</a>
            </div>
            <div className="modal-footer">
              <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={() => {this.acceptTransaction()}} type="button" className="btn btn-primary">Send money!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {transaction, user} = this.props;

    return transaction ?
      <div>
        <p className="lead">Transaction details</p>
        <p>Status: {transaction.status}</p>
        <hr />
        <div className="row">
          <div className="col">
            <p>User: {transaction.created_by_user_id} wants to borrow {transaction.amount} and pay back {transaction.interest} by {transaction.promise_to_pay_date}</p>
            <p>{transaction.memo}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <Link className="btn btn-primary" to={`/profile/${transaction.created_by_user_id}`}>View User</Link>
            {
              user &&
              transaction &&
              user.id !== transaction.created_by_user_id &&
              transaction.status !== 'accepted' ? <button className="btn btn-primary" onClick={this.openModal}>Loan Money</button> : null}
          </div>
        </div>
      </div> : null
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transaction: state.transactionReducer.transaction
  }
};

export default connect(mapStateToProps)(Transaction);
