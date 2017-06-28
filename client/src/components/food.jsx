import React from 'react';
import { getFoodSearch } from '../actions/food.js';
import request from 'request';
import _ from 'underscore';




class Food extends React.Component {

	constructor(props){
    super(props);
    this.state = {
       location: "",
       days: 1,
       results: [],
       resultNames: [],
    }
  }

	activitySearch() {
		this.setState({results: [], resultNames: []})
		
		let activityLatitude;
		let activityLongitude;
		for (let i=0; i<this.state.days; i++) {
			request(
		    {
		      url: `http://localhost:3001/search/activities`,
		      method: 'POST',
		      json: { 
		      	location: this.state.location,
		      	days: this.state.days * 5,
		      },
		    },
	      (err, httpResponse, data) => {
	      	console.log(data.results);
	      	while (true) {
	      		const randomActivity = data.results.businesses[Math.floor(Math.random() * data.results.businesses.length)];
		      	if (!this.state.resultNames.includes(randomActivity.name)) {
			      	activityLatitude = randomActivity.coordinates.latitude;
			      	activityLongitude =  randomActivity.coordinates.longitude;
			      	
			      	this.setState({results: this.state.results.concat([randomActivity])})
			      	this.setState({resultNames: this.state.resultNames.concat([randomActivity.name])})
			      	this.foodSearch(activityLatitude, activityLongitude)
			      	break;
		      	}
	      	}
	      }
	    );
	  }
	}

	foodSearch(latitude, longitude) {
		const tinaFaveFoods = ["Chinese", "Pasta", "Sushi", "Ramen", "Pho",];
		request(
	    {
	      url: `http://localhost:3001/search/restaurants`,
	      method: 'POST',
	      json: { 
	      	term: tinaFaveFoods[Math.floor(Math.random() * tinaFaveFoods.length)], 
	      	days: this.state.days,
	      	latitude: latitude,
	      	longitude: longitude,
	      },
	    },
      (err, httpResponse, foodData) => {
      	while (true) {
      		const randomRestaurant = foodData.results.businesses[Math.floor(Math.random() * foodData.results.businesses.length)];

	      	if (randomRestaurant && !this.state.resultNames.includes(randomRestaurant.name)) {
		      	this.setState({results: this.state.results.concat([randomRestaurant])})
		      	this.setState({resultNames: this.state.resultNames.concat([randomRestaurant.name])})
		      	console.log(this.state.results);
		      	break;
	      	}
      	}
      }
    );
	}

	updateLocation(e) {
		this.setState({location: e.target.value})
	}

	updateDays(e) {
		this.setState({days: e.target.value})
	}

	renderResults() {
		console.log("should rerender");
		const activities = this.state.results.slice(0, this.state.results.length/2)
		const restaurants = this.state.results.slice(this.state.results.length/2, this.state.results.length)
		const interleaved = []
		for (let i=0; i<activities.length; i++) {
			interleaved.push("Day " + (i + 1))
			interleaved.push(["What to do", activities[i]])
			interleaved.push(["What to eat", restaurants[i]])
		}
		if (this.state.results.length === 0) {
			return (<div></div>)
		} else {
			const list = interleaved.map((result) => {
				if (typeof result === 'string') {
					return (
						<h2>
							{result}
						</h2>
					)
				} else {
					return(
						<div>
							<h4>
								{result[0]}
							</h4>
							<li>
								<a href={result[1].url}>
									{result[1].name}
								</a>
							</li>
						</div>
					)
				}
				
			})
			return (
				<ul>
					{list}
				</ul>
			)
		}
	}

	render() {
		return (
			<div>
				<p className="App-intro">
					<label>How many days?</label>
		      <input value={this.state.days} onChange={(e) => this.updateDays(e)}></input>
					<label>Location</label>
		      <input value={this.state.location} onChange={(e) => this.updateLocation(e)}></input>
		      <button onClick={() => this.activitySearch()}>Submit</button>
		    </p>
		    {this.renderResults()}
			</div>
		)
	}
}

export default Food;
