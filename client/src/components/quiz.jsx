import React from 'react';
import request from 'request';
import _ from 'underscore';
import Trip from './trip';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { foodGenres, foodTypes } from '../sharedCategories.js';



class Quiz extends React.Component {

	constructor(props) {
	  super(props);
		this.state = {
        foodGenres: foodGenres(),
        foodTypes: foodTypes()
		};
	}

	renderSubmitButton() {
    return (
      <button onClick={() => this.props.toggleSubmitted(this.state.foodGenres, this.state.foodTypes)}>
        Submit
      </button>
    )
	}


  toggleFoodGenreSelected(i) {
    const copiedFood = this.state.foodGenres;
    copiedFood[i].selected = !copiedFood[i].selected;
    this.setState({
      foodGenres: copiedFood,
    })
  }

  toggleFoodTypeSelected(i) {
    const copiedFood = this.state.foodTypes;
    copiedFood[i].selected = !copiedFood[i].selected;
    this.setState({
      foodTypes: copiedFood,
    })
  }

  renderFoodGenres() {

    const row1 = this.state.foodGenres.slice(0, 9).map((genre, i) => {
      const selected = "selected-" + genre.selected
      return (
        <span onClick={() => this.toggleFoodGenreSelected(i)} className={selected}>
          {genre.displayName}
        </span>
      )
    })
    const row2 = this.state.foodGenres.slice(9, 20).map((genre, i) => {
      const selected = "selected-" + genre.selected
      return (
        <span onClick={() => this.toggleFoodGenreSelected(i+9)} className={selected}>
          {genre.displayName}
        </span>
      )
    })
    const row3 = this.state.foodGenres.slice(20, 30).map((genre, i) => {
      const selected = "selected-" + genre.selected
      return (
        <span onClick={() => this.toggleFoodGenreSelected(i+20)} className={selected}>
          {genre.displayName}
        </span>
      )
    })
    return (
      <div className="food-genre-wrapper">
        <h2>What are your favorite types of cuisine</h2>
        <div className="food-genre-row">
          {row1}
        </div>
        <div className="food-genre-row">
          {row2}
        </div>
        <div className="food-genre-row">
          {row3}
        </div>
      </div>
    )
  }

  renderFoodTypes() {
    const row1 = this.state.foodTypes.slice(0, 9).map((type, i) => {
      const selected = "selected-" + type.selected
      return (
        <span onClick={() => this.toggleFoodTypeSelected(i)} className={selected}>
          {type.displayName}
        </span>
      )
    })
    const row2 = this.state.foodTypes.slice(9, 19).map((type, i) => {
      const selected = "selected-" + type.selected
      return (
        <span onClick={() => this.toggleFoodTypeSelected(i+9)} className={selected}>
          {type.displayName}
        </span>
      )
    })
    const row3 = this.state.foodTypes.slice(19, 29).map((type, i) => {
      const selected = "selected-" + type.selected
      return (
        <span onClick={() => this.toggleFoodTypeSelected(i+19)} className={selected}>
          {type.displayName}
        </span>
      )
    })
    return (
      <div className="food-genre-wrapper">
        <h2>What are some of your other favorite foods?</h2>
        <div className="food-genre-row">
          {row1}
        </div>
        <div className="food-genre-row">
          {row2}
        </div>
        <div className="food-genre-row">
          {row3}
        </div>
      </div>
    )
  }

	render() {
		return (
			<div>
        {this.renderFoodGenres()}
        {this.renderFoodTypes()}
        {this.renderSubmitButton()}
			</div>
		)
	}
}

export default Quiz;
