import React from 'react';
import { Link } from 'react-router-dom';
import pizza from '../../static/pizzas.json';
import underscore from 'underscore';

export default class PizzaListing extends React.Component {
    constructor () {
        super();
        this.state = {
            pizzaDetail: pizza.pizzaList,
            cartArray: []
        };
        this.addToCart = this.addToCart.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
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
         //show success message on clicking of order button
    }

    removeItem(deleteItemId) { 
        let result = this.state.cartArray;
        result.splice(deleteItemId, 1); //remove id from array
        this.setState({
            cartArray: result, //re render the Component
        });
    }

    render() {
        let total = this.state.cartArray.reduce(function (a, b) {
            return a + b.price;
        }, 0)
        return (
            <div className="container pizzaAppWrapper clearfix">
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
                <div className="userCart">
                    <ul className="list-group">
                        {this.state.cartArray.length > 0 && 
                            <li className="clearfix list-group-item list-group-item-dark">
                                <h3 className="pull-left">Name</h3>
                                <span className="pull-right">Action</span>
                                <span className="pull-right">Price</span>
                            </li>
                        }
                        {this.state.cartArray && 
                            underscore.map(this.state.cartArray, (item, key) => {
                                return (
                                    <li className="list-group-item clearfix list-group-item-success" key={key}>
                                        <h4 className="pull-left">{item.name}</h4>
                                        <button 
                                            className="btn removeItemBtn pull-right btn-danger"
                                            onClick={this.removeItem.bind(this, key)}
                                        >X</button>
                                        <span className="pull-right">{item.price}RS</span>
                                    </li>
                                )
                            })
                        } 
                    </ul>
                    {this.state.cartArray.length > 0 &&
                        <div className="clearfix totalPriceWrap">
                            <span className="pull-left">TOTAL :: {total}RS</span>
                            <button className="btn redBtn pull-right" onClick={this.placeOrder}>Place Your Order</button>
                        </div>
                    }
                </div>
            </div>
        );
    }
};
