import _ from 'lodash'
import {API} from '../../API'
import React, { Component } from 'react';
import userActions from '../../actions/userActions';
import {connect} from 'react-redux';
import {dispatchWithTimeout} from '../../utils';
import Script from 'react-load-script';

class IAVStep extends Component {
  state = {
    scriptLoaded: false
  };
  
  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  };

  componentDidMount = () => {
    this.checkIAVStatus();
  };

  checkIAVStatus = () => {
    this.interval = setInterval(() => {
      if (window.dwolla && document.getElementById('iav-container')) {
        this.setState({
          iavLoaded: true
        });
        window.dwolla.configure('sandbox');
        this.initializeIAV();
        clearInterval(this.interval);
      }
    }, 100);
  };

  initializeIAV = () => {
    const {dwollaUser, user} = this.props;
    
    const editHref = _.get(dwollaUser, 'data._links.edit.href', '');
    const editHrefSplit = editHref.split('/');
    const dwollaId = editHrefSplit[editHrefSplit.length - 1];

    API.generateIAVToken(dwollaId, user.token).then((data) => {
      window.dwolla.iav.start(data.data.token, {
        container: 'iav-container'
      }, (e) => {
        clearInterval(this.interval)
      });
    })
    .catch((error) => {
      console.log(error)
      return error
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {scriptLoaded} = this.state;
  };

  render() {
    return (
      <div className="step" id="iav-container">
          Funding sources

          <Script
            url="https://cdn.dwolla.com/1/dwolla.js"
            onLoad={this.handleScriptLoad.bind(this)}
          />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    dwollaUser: state.userReducer.dwollaUser
  }
};

export default connect(mapStateToProps)(IAVStep);
