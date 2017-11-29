import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import transactionActions from '../../actions/transactionActions';
class History extends Component {
  componentDidMount = () => {
    const {dispatch, profile, match, user, router} = this.props;

    const token = user.token;
    const id = profile.id;

    if (token) {
      dispatch(transactionActions.fetchAllBorrowedForUser(id, token));
    }
  };

  renderBorrowHistory = () => {
    const {borrowHistory} = this.props;
    return borrowHistory && borrowHistory.length ? borrowHistory.map((current, index) => {
      return (
        <tr key={`${index}-table-row`}>
          <td>{current.created_at}</td>
          <td>{current.amount}</td>
          <td>{current.interest}</td>
          <td>{current.memo}</td>
          <td>{current.accepted_by_user_id}</td>
        </tr>
      )
    }) : <tr><td><p>nothing borrowed</p></td></tr>;
  };

  renderLendHistory = () => {
    const {lendHistory} = this.props;
    return lendHistory && lendHistory.length ? lendHistory.map((current, index) => {
      return (
        <tr key={`${index}-table-row`}>
          <td>{current.created_at}</td>
          <td>{current.amount}</td>
          <td>{current.interest}</td>
          <td>{current.memo}</td>
          <td>{current.accepted_by_user_id}</td>
        </tr>
      )
    }) : <tr><td><p>nothing loaned</p></td></tr>;
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <p className="lead">borrowed</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">created at</th>
                <th scope="col">amount</th>
                <th scope="col">interest</th>
                <th scope="col">memo</th>
                <th scope="col">accepted by</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBorrowHistory()}
            </tbody>
          </table>
          <p className="lead">loaned</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Username</th>
              </tr>
            </thead>
            <tbody>
              {this.renderLendHistory()}
            </tbody>
          </table>
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
