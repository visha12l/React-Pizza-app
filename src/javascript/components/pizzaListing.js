import React from 'react';
import { Link } from 'react-router-dom';
import pizza from '../../static/pizzas.json';
import underscore from 'underscore';

export default class PizzaListing extends React.Component {
    constructor () {
        super();
        this.state = {
            pizzaDetail: pizza.pizzaList
        };
        this.orderPizza = this.orderPizza.bind(this);
    }

    orderPizza(pizzaName, key) {
        
    }

    render() {
        return (
            <div className="container clearfix">
                <ul className="row clearfix pizzaListing">
                    {underscore.map(this.state.pizzaDetail, (item, key) => {
                        return (
                            <li key={key} className="col-md-4">
                                <div className="text-center">
                                    <img className="img-responsive" src={item.imageUrl} />
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <a href="#" onClick={this.orderPizza.bind(this, item, key)}>ORDER NOW</a>
                                </div>
                            </li>
                          )  
                        })
                    }
                </ul>
            </div>
        );
    }
};
