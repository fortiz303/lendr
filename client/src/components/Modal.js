import _ from 'lodash';
import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    const {closeFunc, actionFunc, bodyContent, headerContent, closeComponent, actionComponent} = this.props.data;
    console.log(this.props)
    return (
      <div>
        <div style={{display: 'block'}}className="modal show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {headerContent}
                <button onClick={closeFunc} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {bodyContent}

              <div className="modal-footer">
                {closeComponent}
                {actionComponent}
              </div>
            </div>
          </div>
        </div>
        <div onClick={closeFunc} className="modal-backdrop"></div>
      </div>
    );
  }
};
