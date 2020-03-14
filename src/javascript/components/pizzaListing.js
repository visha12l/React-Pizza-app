import React from 'react';
import underscore from 'underscore';
import pizza from '../../static/pizzas.json';
import Cart from './cart';
import SuccessPopup from './shared/successPopup';

export default class PizzaListing extends React.Component {
  constructor() {
    super();
    this.state = {
      pizzaDetail: pizza.pizzaList,
      cartArray: [],
      successPopupStatus: false,
      errorMessage: '',
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  addToCart(item, key, event) {
    const { name, discount, price } = item;
    const finalPrice = (price) - (price * discount / 100);
    event.preventDefault();
    if (!underscore.contains(underscore.pluck(this.state.cartArray, 'name'), name)) {
      const result = this.state.cartArray.concat({ name, price, finalPrice });
      this.setState({
        cartArray: result,
      });
    } else {
      alert('item is already added in cart');
    }
  }

  removeItem(deleteItemId) {
    const result = this.state.cartArray;
    result.splice(deleteItemId, 1);
    this.setState({
      cartArray: result,
    });
  }

  placeOrder(/* total */) {
    // const formData = { finalOrder: this.state.cartArray, total };
    this.setState({
      successPopupStatus: true,
    });
    /* post api call to send data to the server
        let url = 'server/order.json';
        save(url, formData).then(this.closePopup, (error) => { setstate for error });
        */
  }

  closePopup() {
    this.setState({
      successPopupStatus: false,
      cartArray: [],
    });
  }

  render() {
    const { errorMessage, successPopupStatus, pizzaDetail, cartArray } = this.state;
    return (
      <div className="container pizzaAppWrapper clearfix">
        {errorMessage && <p>{errorMessage}</p>}
        {successPopupStatus && <SuccessPopup closePopup={this.closePopup} />}
        <h1 className="text-center mainHeading">PIZZA ORDER APP</h1>
        <ul className="row clearfix pizzaListing">
          {underscore.map(pizzaDetail, (item, key) => (
            <li key={key} className="col-md-6">
              <div className="text-center">
                <img className="img-responsive" src={item.imageUrl} alt="pizza" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4 className="discountLabel">Price:: {item.price} RS<span> ({item.discount}% of on MRP)</span></h4>
                <button className="btn redBtn" onClick={this.addToCart.bind(this, item, key)}>ADD TO CART</button>
              </div>
            </li>
            ))
          }
        </ul>
        <Cart cartArray={cartArray} removeItem={this.removeItem} placeOrder={this.placeOrder} />
      </div>
    );
  }
}
