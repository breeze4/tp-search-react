import React, { Component } from 'react';
// import logo from './logo.svg';
import Search from './Search';
import './lib/font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <div className="App-footer"></div>
      </div>
    );
  }
}

export default App;
