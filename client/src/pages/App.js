import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home';
import About from './About';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">Navbar</span>
          </nav>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>

        </div>
      </Router>
    );
  }
}

export default App;
