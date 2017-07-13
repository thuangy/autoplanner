import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/quiz';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>What should I do and eat?</h2>
        </div>

        <Quiz />
        
      </div>
    );
  }
}

export default App;
