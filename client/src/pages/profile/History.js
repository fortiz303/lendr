import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import transactionActions from '../../actions/transactionActions';
import reviewActions from '../../actions/reviewActions';
import errorActions from '../../actions/errorActions';
import TransactionItem from '../../components/TransactionItem';
import RatingsComponent from '../../components/RatingsComponent';

import {Pie, Cell, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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

  // const data = [
  //       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  //       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  //       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  //       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  //       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  //       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  //       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  // ];
  render() {
    const {borrowHistory, lendHistory, user} = this.props;

    let totalBorrowed = 0;
    let totalLoaned = 100;
    let totalInterestPaid = 0;
    let totalInterestReceived = 0;

    let graphData = ((borrowHistory || lendHistory) && user) ?
      _.compact(_.concat(borrowHistory, lendHistory)).map((current, index) => {
        const borrowed = current.created_by_user_id === user.id;
        const loaned = current.accepted_by_user_id === user.id;

        if (borrowed) {
          totalBorrowed = totalBorrowed + current.amount;
          totalInterestPaid = totalInterestPaid + current.interest
        } else if (loaned) {
          totalLoaned = totalLoaned + current.amount;
          totalInterestReceived = totalInterestReceived + current.interest
        }

        return {
          date: new Date(current.created_at).toLocaleDateString(),
          borrowed: borrowed ? (current.amount + current.interest) : 0,
          loaned: loaned ? (current.amount + current.interest) : 0,
          amt: (current.amount + current.interest)
        }
      }) : null;

    const pieData = [
      {name: 'Borrowed', value: (totalBorrowed + totalInterestPaid)},
      {name: 'Loaned', value: (totalLoaned + totalInterestReceived)}
    ];

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h5 className="font-weight-light">overview</h5>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col pr-0 col-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  fill="#007bff"
                  label
                  data={pieData}
                >
                  {
                    pieData.map((entry, index) => <Cell index={index} fill={index === 0 ? '#007bff' : '#47D09D'}/>)
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col pl-0 col-8">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={graphData}
                syncId="anyId"
              >
                <XAxis dataKey="date" />
                <YAxis/>

                <CartesianGrid strokeDasharray="3 3"/>

                <Tooltip/>

                <Bar type='monotone' stackId="a" dataKey='borrowed' stroke='#007bff' fill='#007bff' />
                <Bar type='monotone' stackId="a" dataKey='loaned' stroke='#47D09D' fill='#47D09D' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h5 className="font-weight-light">borrowed</h5>
            <div className="card-deckzzzz">
              {this.renderHistory(borrowHistory, 'borrowed')}
            </div>
          </div>
          <div className="col">
            <h5 className="font-weight-light">loaned</h5>
            <div className="card-deckzzzz">
              {this.renderHistory(lendHistory, 'loaned')}
            </div>
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
