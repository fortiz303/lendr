import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import transactionActions from '../actions/transactionActions';
import authActions from '../actions/authActions';
class Transaction extends Component {
  componentDidMount = () => {
    const {dispatch, transactionFeed, match} = this.props;

    const token = _.get(window.sessionStorage, 'token', false);

    if (token) {
      dispatch(authActions.authenticate(token));
      const id = _.get(match, 'params.id', false);
      console.log(match);
      if (token && !transactionFeed && id) {
        dispatch(transactionActions.fetchById(id, token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transactionFeed} = this.props;

    if (_.get(prevProps, 'user.uid', false) !== _.get(user, 'uid', false) && user.token && transactionFeed !== prevProps.transactionFeed) {
      dispatch(transactionActions.fetchAll(user.token));
    }
  };


  render() {
    console.log(this.props)
    return (
      <div className="content-wrapper">
        <h1 className="display-2 text-primary">
          Transaction Details
        </h1>
        <p className="lead">sub title line - decided on content here</p>
        <hr />
        <div className="row">
          <div className="col">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          </div>
        </div>
      </div>
    );
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