import React from 'react';
import { fetch, save } from '../utils/restUtils';
import pizza from '../../static/pizzas.json';
import Cart from './cart';
import underscore from 'underscore';
import SuccessPopup from './shared/successPopup';

export default class PizzaListing extends React.Component {

    constructor () {
        super();
        this.state = {
            pizzaDetail: pizza.pizzaList,
            cartArray: [],
            successPopupStatus: false,
            errorMessage: ''
        };
        this.addToCart = this.addToCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.fetchPizzaList = this.fetchPizzaList.bind(this);
        this.successHandler = this.successHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    componentWillMount() {
        this.fetchPizzaList();   
    }

    addToCart(name, price, key, event) {
        event.preventDefault();
        if (!underscore.contains(underscore.pluck(this.state.cartArray, 'name'), name)) {
            var result = this.state.cartArray.concat({ name: name, price: price });
            this.setState({
                cartArray: result
            });
        } else {
            alert('item is already added in cart');
        }
    }

    fetchPizzaList() {
        // let url =  'server/pizzas.json';
        // fetch(url, this.successHandler, this.errorHandler);
    }

    successHandler(result) {
        // this.setState({
        //     pizzaDetail: result,
        // });
    }

    errorHandler(error) {
        // this.setState({
        //     errorMessage: error ? error.description : 'Error fetching data.'
        // });
    }

    removeItem(deleteItemId) {
        let result = this.state.cartArray;
        result.splice(deleteItemId, 1);
        this.setState({
            cartArray: result,
        });
    }

    placeOrder(total) {
        let formData = { finalOrder: this.state.cartArray, total };
        this.setState({
            successPopupStatus: true
        });
        /*post api call to send data to the server
        let url = 'server/order.json';
        save(url, formData).then(this.closePopup, (error) => { this.setState({ errorMessage: error.description }); });
        */
    }
    
    closePopup() {
        this.setState({
            successPopupStatus: false,
            cartArray: []
        });
    }

    render() {
        return (
            <div className="container pizzaAppWrapper clearfix">
                {this.state.errorMessage &&  <p>{this.state.errorMessage}</p>}
                {this.state.successPopupStatus && <SuccessPopup closePopup={this.closePopup} />}
                <ul className="row clearfix pizzaListing">
                    {underscore.map(this.state.pizzaDetail, (item, key) => {
                        return (
                            <li key={key} className="col-md-6">
                                <div className="text-center">
                                    <img className="img-responsive" src={item.imageUrl} />
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <a href="#" className="btn redBtn" onClick={this.addToCart.bind(this, item.name, item.price, key)}>ADD TO CART</a>
                                </div>
                            </li>
                          )  
                        })
                    }
                </ul>
                <Cart cartArray={this.state.cartArray} removeItem={this.removeItem} placeOrder={this.placeOrder} />
            </div>
        );
    }
};
