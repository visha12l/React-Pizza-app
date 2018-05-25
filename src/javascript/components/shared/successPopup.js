import React from 'react';
import PropTypes from 'prop-types';

export default class SuccessPopup extends React.Component {
  constructor() {
    super();
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup() {
    this.props.closePopup();
  }

  render() {
    return (
      <div className="successPopupWrap">
        <div className="content">
          <p>Thank you for placing the order</p>
          <h3>your order will arrive in 30 minutes</h3>
          <button className="btn redBtn" onClick={this.closePopup}>OK</button>
        </div>
      </div>
    );
  }
}

SuccessPopup.defaultProps = {
  closePopup: undefined,
};

SuccessPopup.propTypes = {
  closePopup: PropTypes.func,
};
