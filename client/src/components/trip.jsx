import React from 'react';
import { getFoodSearch } from '../actions/food.js';
import request from 'request';
import _ from 'underscore';




class Trip extends React.Component {

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
		console.log("here is activity search");
		this.setState({results: [], resultNames: []})

		let activityLatitude;
		let activityLongitude;
		for (let i=0; i<this.state.days; i++) {
			console.log("inside activity for loop");
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
					if (data.results) {
						let clonedActivities = JSON.parse(JSON.stringify(data.results.businesses));
		      	console.log("HERE IS CLONED RESULTS");
		      	console.log(clonedActivities);
		      	while (true) {
		      		console.log("inside activity while loop");
		      		const randomActivity = clonedActivities[Math.floor(Math.random() * clonedActivities.length)];
			      	if (randomActivity && !this.state.resultNames.includes(randomActivity.name)) {
								console.log(randomActivity);
								console.log("added randomActivity to results");
				      	activityLatitude = randomActivity.coordinates.latitude;
				      	activityLongitude =  randomActivity.coordinates.longitude;

				      	this.setState({results: this.state.results.concat([randomActivity])})
				      	this.setState({resultNames: this.state.resultNames.concat([randomActivity.name])})
				      	clonedActivities = clonedActivities.filter((a) => {
				      		return a.name !== randomActivity.name
				      	})
				      	this.foodSearch(activityLatitude, activityLongitude)
				      	break;
			      	}
		      	}
					} else {
						this.setState({
							days: this.state.days + 1,
						})
					}

	      }
	    );
	  }
	}

	foodSearch(latitude, longitude) {
		console.log("here is food search");
		const tinaFaveFoods = ["Chinese", "Pasta", "Sushi", "Ramen", "Pho",];
		let clonedFood = []
		while (clonedFood.length === 0) {
			console.log("inside food loop?");
			console.log(clonedFood)
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
	      	clonedFood = JSON.parse(JSON.stringify(foodData.results.businesses));
					console.log("HERE IS CLONED FOOD");
					console.log(clonedFood);
	      	if (clonedFood.length > 0) {
	      		while (true) {
		      		console.log("inside food for loop");
		      		const randomRestaurant = clonedFood[Math.floor(Math.random() * clonedFood.length)];
		      		console.log(randomRestaurant);

			      	if (randomRestaurant && !this.state.resultNames.includes(randomRestaurant.name)) {
								console.log("added random restaurant to results");
				      	this.setState({results: this.state.results.concat([randomRestaurant])})
				      	this.setState({resultNames: this.state.resultNames.concat([randomRestaurant.name])})
				      	clonedFood = clonedFood.filter((f) => {
				      		return f.name !== randomRestaurant.name
				      	})
				      	console.log(this.state.results);
				      	break;
			      	}
		      	}
	      	}

	      }
	    );
		}

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
		const interleaved = [];
		for (let i=0; i<activities.length; i++) {
			interleaved.push(["Day " + (i + 1),
				["What to do", activities[i]],
				["What to eat", restaurants[i]]
			])
			// titles.push("Day " + (i + 1));
			// interleaved.push(["What to do", activities[i]])
			// interleaved.push(["What to eat", restaurants[i]])
		}
		console.log(interleaved);
		if (this.state.results.length === 0) {
			return (<div></div>)
		} else {
			const list = interleaved.map((result) => {
				return (
					<div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
						<h2>
							{result[0]}
						</h2>
						<h4>
							{result[1][0]}
						</h4>
						<li style={{listStyle: 'none'}}>
							<a href={result[1][1].url}>
								{result[1][1].name}
							</a>
						</li>
						<h4>
							{result[2][0]}
						</h4>
						<li style={{listStyle: 'none'}}>
							<a href={result[2][1].url}>
								{result[2][1].name}
							</a>
						</li>
					</div>
				)
			});


			// 	if (typeof result === 'string') {
			// 		return (
			// 			<h2 style={{display: "flex", justifyContent: "space-around"}}>
			// 				{result}
			// 			</h2>
			// 		)
			// 	} else {
			// 		return(
			// 			<div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
			// 				<h4>
			// 					{result[0]}
			// 				</h4>
			// 				<li style={{listStyle: 'none'}}>
			// 					<a href={result[1].url}>
			// 						{result[1].name}
			// 					</a>
			// 				</li>
			// 			</div>
			// 		)
			// 	}

			// })
			return (
				<ul style={{paddingLeft: "0px", display: "flex", flexWrap: "wrap"}}>
					<div>
						{list}
					</div>
				</ul>
			)
		}
	}

	render() {
		return (
			<div>
				<label>How many days?</label>
	      <input value={this.state.days} onChange={(e) => this.updateDays(e)}></input>
				<label>Location</label>
	      <input value={this.state.location} onChange={(e) => this.updateLocation(e)}></input>
	      <button onClick={() => this.activitySearch()}>Submit</button>
	      <div id="results">
		    	{this.renderResults()}
		    </div>
			</div>
		)
	}
}

export default Trip;
