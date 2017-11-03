import _ from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';

import authActions from '../actions/authActions';
import transactionActions from '../actions/transactionActions';

class Home extends Component {
  render() {
    return <div>lol</div>
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
