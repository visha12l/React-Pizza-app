import React from 'react';
import pizza from '../../static/pizzas.json';
import Cart from './cart';
import underscore from 'underscore';

export default class PizzaListing extends React.Component {

    constructor () {
        super();
        this.state = {
            pizzaDetail: pizza.pizzaList,
            cartArray: []
        };
        this.addToCart = this.addToCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
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

    removeItem(deleteItemId) { 
        debugger
        let result = this.state.cartArray;
        result.splice(deleteItemId, 1);
        this.setState({
            cartArray: result,
        });
    }

    render() {
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
                <Cart cartArray={this.state.cartArray} removeItem={this.removeItem}/>
            </div>
        );
    }
};
