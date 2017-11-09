import _ from 'lodash';
import React, { Component } from 'react';

const MAX_STEPS = 4;

export default class NewLoanEntry extends Component {
  state = {
    currentStep: 0,
    valid: false,
    step1Value: '',
    step2Value: '',
    step3Value: '',
    step4Value: ''
  };

  renderSteps = () => {
    const {currentStep} = this.state;

    const step1 = 
      <div className="step"> 
        <p className="lead">How much do you need to borrow?</p>
        <input className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step2 = 
      <div className="step"> 
        <p className="lead">How much interest are you going to pay?</p>
        <input className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step3 = 
      <div className="step"> 
        <p className="lead">When do you promise to pay it back??</p>
        <input className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step4 = 
      <div className="step"> 
        <p className="lead">What's it for??</p>
        <input className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const stepArray = [step1, step2, step3, step4];
    console.log()
    return stepArray[currentStep]
  };

  paginate = (direction) => {
    console.log(direction)
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

  render() {
    return (
      <div className="new-loan-entry-wrapper">
        <div className="controls">
          <span onClick={() => {this.paginate('back')}} className="control back">Back</span>
          <span className="control pagination">- - - </span>
          <span onClick={() => {this.paginate('fwd')}} className="control forward">Forward</span>
        </div>

        <div className="steps">
          {this.renderSteps()}
        </div>
      </div>
    );
  }
}