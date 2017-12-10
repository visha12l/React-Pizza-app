import React from 'react';
import underscore from 'underscore';

export default class Cart extends React.Component {

    constructor (props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    removeItem(key) {
        this.props.removeItem(key);
    }

    placeOrder(total) {
        this.props.placeOrder(total);
    }

    render() {
        let {cartArray} = this.props;
        let total = cartArray.reduce((a, b) => {
            return a + b.finalPrice;
        }, 0);
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
                        underscore.map(cartArray, (item, key) => {
                            return (
                                <li className="list-group-item clearfix list-group-item-success" key={key}>
                                    <h4 className="pull-left name">{key + 1}){item.name}</h4>
                                    <button 
                                        className="btn action removeItemBtn pull-right btn-danger"
                                        onClick={this.removeItem.bind(this, key)}
                                    >X</button>
                                    <span className="pull-right price">{item.finalPrice}RS</span>
                                </li>
                            )
                        })
                    } 
                </ul>
                {cartArray.length > 0 &&
                    <div className="clearfix totalPriceWrap">
                        <label className="pull-left">TOTAL => {total} RS</label>
                        <button className="btn redBtn pull-right" onClick={this.placeOrder.bind(this, total)}>Place Your Order</button>
                    </div>
                }
            </div>
        );
    }
};
