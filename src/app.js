import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import Password from './javascript/components/password';
import './css/style.css';

ReactDom.render(
  (
    <Router>
      <Route exact path="/" component={Password} />
    </Router>
  ), document.getElementById('app'),
);
