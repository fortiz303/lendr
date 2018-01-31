import React, { Component } from 'react';
import {connect} from 'react-redux';
import DwollaStep from './DwollaStep';

class Update extends Component {
  state = {
    currentStep: 0
  };

  setStep = (step) => {
    this.setState({currentStep: step});
  };

  renderCurrentScreen = () => {
    const {user} = this.props;
    const {currentStep} = this.state;

    const profileStep =
      <div className="step">
        <form>
          <div className="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
        </form>
      </div>

    const dwollaStep = <DwollaStep user={user} />;
    const stepArray = [profileStep, dwollaStep];

    return stepArray[currentStep];
  }
  render() {
    const {currentStep} = this.state;
    return (
      <div className="row settings-wrapper">
        <div className="col-lg-2 step-wrapper">
          <span
            className={`step-indicator ${currentStep === 0 ? 'active': null}`}
            onClick={() => {this.setStep(0)}}
          >
            Profile
          </span>
          <span
            className={`step-indicator ${currentStep === 1 ? 'active': null}`}
          onClick={() => {this.setStep(1)}}
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
