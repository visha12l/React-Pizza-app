import React from 'react';
import underscore from 'underscore';
import PropTypes from 'prop-types';
import couponCodes from '../../static/coupon.json';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponData: couponCodes.coupon,
      couponDiscount: 0,
    };
    this.couponInput = React.createRef();
    this.floatingLabel = React.createRef();
    this.removeItem = this.removeItem.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.resetCouponCode = this.resetCouponCode.bind(this);
    this.applyCoupon = this.applyCoupon.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  removeItem(key) {
    this.resetCouponCode();
    this.props.removeItem(key);
  }

  applyCoupon() {
    const userInput = this.couponInput.value.toUpperCase();
    if (userInput) {
      const result = underscore.filter(this.state.couponData, (item) => {
        if (userInput === item.name) {
          this.setState({
            couponDiscount: item.discount,
          });
          return item;
        }
      });
      if (underscore.isEmpty(result)) {
        alert('invalid code !!!');
        this.resetCouponCode();
      }
    } else {
      alert('empty code !!!');
      this.resetCouponCode();
    }
    this.couponInput.value = '';
  }

  placeOrder(total) {
    this.props.placeOrder(total);
  }

  resetCouponCode() {
    this.setState({
      couponDiscount: 0,
    });
  }

  handleInputFocus() {
    this.floatingLabel.classList.remove('hide');
  }

  handleInputBlur() {
    this.floatingLabel.classList.add('hide');
  }

  render() {
    const { cartArray } = this.props;
    let total = cartArray.reduce((a, b) => a + b.finalPrice, 0);
    total -= total * (this.state.couponDiscount / 100);
    return (
      <div className="userCart">
        <ul className="list-group">
          {cartArray.length > 0 &&
            <li className="clearfix list-group-item list-group-item-dark">
              <h3 className="pull-left name">Name</h3>
              <h3 className="pull-right action">Action</h3>
              <h3 className="pull-right price">Price</h3>
            </li>
          }
          {cartArray &&
            underscore.map(cartArray, (item, key) => (
              <li className="list-group-item clearfix list-group-item-success" key={key}>
                <h4 className="pull-left name">{key + 1}){item.name}</h4>
                <button
                  className="btn action removeItemBtn pull-right btn-danger"
                  onClick={this.removeItem.bind(this, key)}
                >X
                </button>
                <span className="pull-right price">{item.finalPrice}RS</span>
              </li>
            ))
          }
        </ul>
        {cartArray.length > 0 &&
        <div className="totalPriceWrap text-center">
          {this.state.couponDiscount ? <p className="couponMessage">Congratulations Coupon Applied !!!</p> : null}
          <div className="clearfix">
            <div className="pull-left couponWrap">
              <input
                ref={this.couponInput}
                type="text"
                className="couponInput"
                placeholder="Enter Code"
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
              <span className="floatingLabel hide" ref={this.floatingLabel}>Enter Code</span>
              <button className="btn btn-info" onClick={this.applyCoupon}>Apply Coupon</button>
            </div>
            <span className="pull-right">TOTAL => {total} RS</span>
          </div>
          <button className="btn redBtn" onClick={this.placeOrder.bind(this, total)}>Place Your Order</button>
        </div>
        }
      </div>
    );
  }
}

Cart.defaultProps = {
  placeOrder: undefined,
  cartArray: [],
};

Cart.propTypes = {
  placeOrder: PropTypes.func,
  cartArray: PropTypes.arrayOf,
};
