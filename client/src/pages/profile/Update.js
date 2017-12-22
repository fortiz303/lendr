import React, { Component } from 'react';
import {connect} from 'react-redux';

class Update extends Component {
  state = {
    currentStep: 0
  };
  renderCurrentScreen = () => {
    const {currentStep} = this.state;

    return (
      <div className="step">
        <p className="lead">hello</p>
      </div>
    );
  }
  render() {
    const {currentStep} = this.state;
    return (
      <div className="row settings-wrapper">
        <div className="col-lg-2 step-wrapper">
          <span
            className={`step-indicator ${currentStep === 0 ? 'active': null}`}
            onClick={() => {this.props.setStep(0)}}
          >
            Profile
          </span>
          <span
            className={`step-indicator ${currentStep === 1 ? 'active': null}`}
          onClick={() => {this.props.setStep(1)}}
          >
            Bank Account
          </span>
        </div>

        <div className="col-lg-10">
          {this.renderCurrentScreen()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Update);
