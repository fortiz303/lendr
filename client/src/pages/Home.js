import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';

import authActions from '../actions/authActions';
import transactionActions from '../actions/transactionActions';

class Home extends Component {
  state = {
    
  };

  componentDidMount = () => {
    const {dispatch, history} = this.props;

    // check sessionStorage for token
    const token = _.get(window.sessionStorage, 'token', false);

    if (token) {
      dispatch(transactionActions.fetchAll(token));
      dispatch(authActions.setToken(token))
    } else {
      history.replace('/');
    }
  };

  authenticate = () => {
    const {passwordInput, usernameInput} = this.state;

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const opts = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        user_name: usernameInput,
        password: passwordInput
      })
    };

    fetch(`/api/v1/authenticate`, opts)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          authtoken: data.token,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  };
  renderTransactionFeed = () => {
    const {transactionFeed} = this.props;

    return transactionFeed && transactionFeed.length ? transactionFeed.map((current, index) => {
      return (
        <p>Transaction ID: <strong>{current.id}</strong> from <strong>{current.from}</strong> to <strong>{current.to}</strong> has a status: <strong>{current.status}</strong></p>
      )
    }) : null
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
          <div className="col">
            
            {this.renderTransactionFeed()}
          
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
    transactionFeed: state.transactionReducer.transactionFeed
  }
};

export default connect(mapStateToProps)(Home);
