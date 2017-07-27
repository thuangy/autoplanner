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

  toggleSubmitted(foodGenres, foodTypes, activityTypes) {
    const likedFoodGenres = foodGenres.filter((genre) => genre.selected).map((genre) => genre.id)
    const likedFoodTypes = foodTypes.filter((type) => type.selected).map((type) => type.id)
    const likedActivityTypes = activityTypes.filter((type) => type.selected).map((type) => type.id)
    localStorage.setItem("foodGenres", likedFoodGenres)
    localStorage.setItem("foodTypes", likedFoodTypes)
    localStorage.setItem("activityTypes", likedActivityTypes)
    this.setState({
      quizSubmitted: true
    })
  }

  render() {
    const quizOrTrip = (this.state.quizSubmitted || (localStorage.getItem("activityTypes") && localStorage.getItem("foodTypes") && localStorage.getItem("foodGenres"))) ? <Trip /> : <Quiz toggleSubmitted={this.toggleSubmitted}/>;
    //const quizOrTrip = (this.state.quizSubmitted) ? <Trip /> : <Quiz toggleSubmitted={this.toggleSubmitted}/>;
    return (
      <div>
        <div className="App-header">
          <h1>What should I do and eat?</h1>
        </div>

        {quizOrTrip}

      </div>
    );
  }
}

export default App;
