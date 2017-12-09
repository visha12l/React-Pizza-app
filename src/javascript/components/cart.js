import React from 'react';
import underscore from 'underscore';

export default class Cart extends React.Component {

    constructor () {
        super();
        this.removeItem = this.removeItem.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    removeItem(key) {
        this.props.removeItem(key);
    }

    placeOrder() {
        //show popup on succesfull order
    }

    render() {
        let {cartArray} = this.props;
        let total = cartArray.reduce(function (a, b) {
            return a + b.price;
        }, 0)
        return (
                <div className="userCart">
                    <ul className="list-group">
                        {cartArray.length > 0 && 
                                <li className="clearfix list-group-item list-group-item-dark">
                                    <h3 className="pull-left">Name</h3>
                                    <span className="pull-right">Action</span>
                                    <span className="pull-right">Price</span>
                                </li>
                        }
                        {cartArray && 
                            underscore.map(cartArray, (item, key) => {
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
                    {cartArray.length > 0 &&
                        <div className="clearfix totalPriceWrap">
                            <span className="pull-left">TOTAL :: {total}RS</span>
                            <button className="btn redBtn pull-right" onClick={this.placeOrder}>Place Your Order</button>
                        </div>
                    }
                </div>
        );
    }
};
