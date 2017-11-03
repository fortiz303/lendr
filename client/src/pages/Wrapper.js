import _ from 'lodash';
import { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import authActions from '../actions/authActions';

class Wrapper extends Component {
  componentDidMount = () => {
    const {dispatch, history} = this.props;
    const token = _.get(window.sessionStorage, 'token', false);

    if (token && !this.props.authStatus) {
      dispatch(authActions.authenticate(token));
    } else {
      history.replace('/login')
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    const {dispatch, history} = this.props;
    const token = _.get(window.sessionStorage, 'token', false);

    if (prevProps.authStatus !== this.props.authStatus && !this.props.authStatus) {
      if (token) {
        dispatch(authActions.authenticate(token));
      } else {
        history.replace('/login')
      }
    }
  };

  render() {
    return this.props.children
  }
};
const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};
export default connect(mapStateToProps)(withRouter(Wrapper));
