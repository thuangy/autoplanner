import React from 'react';
import request from 'request';
import _ from 'underscore';
import Trip from './trip';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { foodGenres, foodTypes, activityTypes } from '../sharedCategories.js';



class Quiz extends React.Component {

	constructor(props) {
	  super(props);
		this.state = {
        foodGenres: foodGenres(),
        foodTypes: foodTypes(),
        activityTypes: activityTypes(),
        page: 1,
		};
	}

	renderSubmitButton() {
    return (
      <button id="submit-quiz-button" onClick={() => this.props.toggleSubmitted(this.state.foodGenres, this.state.foodTypes, this.state.activityTypes)}>
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

  toggleActivityTypeSelected(i) {
    const copiedActivities = this.state.activityTypes;
    copiedActivities[i].selected = !copiedActivities[i].selected;
    this.setState({
      activityTypes: copiedActivities,
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
      <div className="quiz-question">
        <div className="type-wrapper">
          <h2>What are your favorite types of cuisine?</h2>
          <div className="type-row">
            {row1}
          </div>
          <div className="type-row">
            {row2}
          </div>
          <div className="type-row">
            {row3}
          </div>
        </div>
        {this.renderNextPageButton()}
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
      <div className="quiz-question">
        <div className="type-wrapper">
          <h2>What are some of your other favorite foods?</h2>
          <div className="type-row">
            {row1}
          </div>
          <div className="type-row">
            {row2}
          </div>
          <div className="type-row">
            {row3}
          </div>
        </div>
        {this.renderSubmitButton()}
      </div>
    )
  }

  renderActivityTypes() {
    const row1 = this.state.activityTypes.slice(0, 7).map((activity, i) => {
      const selected = "selected-" + activity.selected
      return (
        <span onClick={() => this.toggleActivityTypeSelected(i)} className={selected}>
          {activity.displayName}
        </span>
      )
    })
    const row2 = this.state.activityTypes.slice(7, 14).map((activity, i) => {
      const selected = "selected-" + activity.selected
      return (
        <span onClick={() => this.toggleActivityTypeSelected(i+7)} className={selected}>
          {activity.displayName}
        </span>
      )
    })
    const row3 = this.state.activityTypes.slice(14, 23).map((activity, i) => {
      const selected = "selected-" + activity.selected
      return (
        <span onClick={() => this.toggleActivityTypeSelected(i+14)} className={selected}>
          {activity.displayName}
        </span>
      )
    })
    return (
      <div className="quiz-question">
        <div className="type-wrapper">
          <h2>What are your favorite types of vacation activities?</h2>
          <div className="type-row">
            {row1}
          </div>
          <div className="type-row">
            {row2}
          </div>
          <div className="type-row">
            {row3}
          </div>
        </div>
        {this.renderNextPageButton()}
      </div>
    )
  }

  renderNextPageButton() {
    return <button id="next-page-button" onClick={() => {this.setState({page: this.state.page + 1})}}>Next ›</button>
  }

  renderPage() {
    switch(this.state.page) {
      case 1:
        return this.renderActivityTypes()
      case 2:
        return this.renderFoodGenres()
      case 3:
        return this.renderFoodTypes()
      default:
        return(<p>Unknown Page</p>)
    }
  }

	render() {
		return (
			<div>
        {this.renderPage()}
			</div>
		)
	}
}

export default Quiz;
