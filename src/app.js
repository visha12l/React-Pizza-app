import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import PizzaListing from './javascript/components/pizzaListing';
import './css/style.css';

ReactDom.render(
  (
    <Router>
      <div>
        <Route exact path="/" component={PizzaListing} />
      </div>
    </Router>
  ), document.getElementById('app'),
);
