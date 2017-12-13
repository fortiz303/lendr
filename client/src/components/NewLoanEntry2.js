import _ from 'lodash';
import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

const FORWARD_KEYS = [13, 39]
const BACKWARD_KEYS = [37]
export default class NewLoanEntry extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e) => {
    if (_.includes(FORWARD_KEYS, e.keyCode)) {
      this.props.paginate('fwd');
    } else if (_.includes(BACKWARD_KEYS, e.keyCode)) {
      this.props.paginate('back');
    }
  };

  handleDayClick = (day) => {
    this.props.handleInput({target: {value: day}}, 'promise_to_pay_date');
  };

  renderSteps = () => {
    const {currentStep} = this.props;

    const step1 =
      <div className="step">
        <h4 className="card-title">How much do you need to borrow?</h4>
        <input
          className="new-loan-input"
          onChange={(e) => {this.props.handleInput(e, 'amount')}}
          type="number"
          value={this.props.amount}
        />
      </div>

    const step2 =
      <div className="step">
        <h4 className="card-title">How much interest are you going to pay?</h4>
        <input
          className="new-loan-input"
          onChange={(e) => {this.props.handleInput(e, 'interest')}}
          type="number"
          value={this.props.interest}
        />
      </div>

    const step3 =
      <div className="step">
        <h4 className="card-title">When do you promise to pay it back??</h4>
        <DayPicker
          selectedDays={this.props.promise_to_pay_date}
          onDayClick={this.handleDayClick}
        />
      </div>

    const step4 =
      <div className="step">
        <h4 className="card-title">What's it for??</h4>
        <input
          className="new-loan-input"
          onChange={(e) => {this.props.handleInput(e, 'memo')}}
          type="text"
          value={this.props.memo}
        />
      </div>

    const step5 =
      <div className="step">
        <h4 className="card-title">Ready?</h4>
        <a
          className="btn btn-block btn-primary"
          type="submit"
          onClick={() => {this.props.handleSubmit()}}
        >
          Submit
        </a>
      </div>

    const stepArray = [step1, step2, step3, step4, step5];

    return (
      <div className="new-loan-input-wrapper">
        <div className="new-loan-pagination" onClick={() => {this.props.paginate('back')}}>
          <span className="oi oi-arrow-left"></span>
        </div>

        <div className="new-loan-input-content">
          {stepArray[currentStep]}
        </div>

        <div className="new-loan-pagination" onClick={() => {this.props.paginate('fwd')}}>
          <span className="oi oi-arrow-right"></span>
        </div>
      </div>
    )
  };

  render() {
    const {currentStep} = this.props;

    return (
      <div className="new-loan-entry-wrapper">
        <div className="row">
          <div className="col-lg-2 step-wrapper">
            <span
              className={`step-indicator ${currentStep === 0 ? 'active': null}`}
              onClick={() => {this.props.setStep(0)}}
            >
              Amount
            </span>
            <span
              className={`step-indicator ${currentStep === 1 ? 'active': null}`}
              onClick={() => {this.props.setStep(1)}}
            >
              Interest
            </span>
            <span
              className={`step-indicator ${currentStep === 2 ? 'active': null}`}
              onClick={() => {this.props.setStep(2)}}
            >
              Payback
            </span>
            <span
              className={`step-indicator ${currentStep === 3 ? 'active': null}`}
              onClick={() => {this.props.setStep(3)}}
            >
              Memo
            </span>
            <span
              className={`step-indicator ${currentStep === 4 ? 'active': null}`}
              onClick={() => {this.props.setStep(4)}}
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
