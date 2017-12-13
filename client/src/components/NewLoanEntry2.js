import _ from 'lodash';
import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

const MAX_STEPS = 5;

export default class NewLoanEntry extends Component {
  state = {
    currentStep: 0,
    valid: false,
    step1Value: '',
    step2Value: '',
    step3Value: '',
    step4Value: '',
    selectedDay: undefined
  };

  handleDayClick = (day) => {
    this.setState({
      selectedDay: day
    });
  };

  renderSteps = () => {
    const {currentStep} = this.state;

    const step1 =
      <div className="step">
        <h4 className="card-title">How much do you need to borrow?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input className="new-loan-input" onChange={(e) => {this.handleInput(e, 'step1')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step2 =
      <div className="step">
        <h4 className="card-title">How much interest are you going to pay?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input className="new-loan-input" onChange={(e) => {this.handleInput(e, 'step2')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step3 =
      <div className="step">
        <h4 className="card-title">When do you promise to pay it back??</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
      </div>

    const step4 =
      <div className="step">
        <h4 className="card-title">What's it for??</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input className="new-loan-input" onChange={(e) => {this.handleInput(e, 'step4')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step5 =
      <div className="step">
        <h4 className="card-title">Ready?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <button type="submit">Post!</button>
      </div>

    const stepArray = [step1, step2, step3, step4, step5];

    return (
      <div className="new-loan-input-wrapper">
        <div className="new-loan-pagination" onClick={() => {this.paginate('back')}}>
          <span className="oi oi-arrow-left"></span>
        </div>

        <div className="new-loan-input-content">
          {stepArray[currentStep]}
        </div>

        <div className="new-loan-pagination" onClick={() => {this.paginate('fwd')}}>
          <span className="oi oi-arrow-right"></span>
        </div>
      </div>
    )
  };

  paginate = (direction) => {
    const {currentStep} = this.state;

    if (direction === 'fwd') {
      if (currentStep === MAX_STEPS - 1) {
        return false
      } else {
        this.setState({currentStep: currentStep + 1})
      }
    } else if (direction === 'back') {
      if (currentStep === 0) {
        return false
      } else {
        this.setState({currentStep: currentStep - 1})
      }
    }
  };

  setStep = (step) => {
    this.setState({
      currentStep: step
    });
  };

  render() {
    const {currentStep} = this.state;

    return (
      <div className="new-loan-entry-wrapper">
        <div className="row">
          <div className="col-lg-2 step-wrapper">
            <span
              className={`step-indicator ${currentStep === 0 ? 'active': null}`}
              onClick={() => {this.setStep(0)}}
            >
              Amount
            </span>
            <span
              className={`step-indicator ${currentStep === 1 ? 'active': null}`}
              onClick={() => {this.setStep(1)}}
            >
              Interest
            </span>
            <span
              className={`step-indicator ${currentStep === 2 ? 'active': null}`}
              onClick={() => {this.setStep(2)}}
            >
              Payback
            </span>
            <span
              className={`step-indicator ${currentStep === 3 ? 'active': null}`}
              onClick={() => {this.setStep(3)}}
            >
              Memo
            </span>
            <span
              className={`step-indicator ${currentStep === 4 ? 'active': null}`}
              onClick={() => {this.setStep(4)}}
            >
              Confirm
            </span>
          </div>

          <div className="col-lg-10">
            {this.renderSteps()}
          </div>
        </div>
      </div>
    );
  }
}
