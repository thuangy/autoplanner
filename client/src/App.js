import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './components/quiz';
import Trip from './components/trip';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizSubmitted: false,
    }
    this.toggleSubmitted = this.toggleSubmitted.bind(this)
  }

  toggleSubmitted(foodGenres, foodTypes) {
    const likedGenres = foodGenres.filter((genre) => genre.selected).map((genre) => genre.id)
    const likedTypes = foodTypes.filter((type) => type.selected).map((type) => type.id)
    localStorage.setItem("genres", likedGenres)
    localStorage.setItem("types", likedTypes)
    this.setState({
      quizSubmitted: true
    })
  }

  render() {
    //const quizOrTrip = (this.state.quizSubmitted || (localStorage.getItem("types") && localStorage.getItem("genres"))) ? <Trip /> : <Quiz toggleSubmitted={this.toggleSubmitted}/>;
    const quizOrTrip = (this.state.quizSubmitted) ? <Trip /> : <Quiz toggleSubmitted={this.toggleSubmitted}/>;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>What should I do and eat?</h2>
        </div>

        {quizOrTrip}

      </div>
    );
  }
}

export default App;
