import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './javascript/components/home.js';
//import './css/style.css';

ReactDom.render((
   <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
   </Router>
), document.getElementById('app'));
