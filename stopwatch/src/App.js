import React from 'react';
import { Component } from 'react';

import Clock from './clock/clock.js'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  render () {
    return (
      <div className="App-main">
        <Clock />
      </div>
    )
  }
}

export default App;
