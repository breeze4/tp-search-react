import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Search from './Search';
import './lib/font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/:activeTab?/:searchText?" component={Search} />
        <div className="App-footer"></div>
      </div>
    );
  }
}

export default App;
