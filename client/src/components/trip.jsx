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
			 activities: [],
			 activityNames: [],
			 restaurants: [],
			 restaurantNames: [],
    }
  }

	activitySearch() {
		console.log("here is activity search");
		this.setState({results: [], resultNames: [], activities: [], activityNames: [], restaurants: [], restaurantNames: []})

		let activityLatitude;
		let activityLongitude;
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
					let clonedActivities = data.results.businesses;
					for (let i = 0; i < this.state.days; i++) {
						const randomActivity = clonedActivities[Math.floor(Math.random() * clonedActivities.length)];
		      	if (randomActivity && !this.state.activityNames.includes(randomActivity.name)) {
							//console.log(randomActivity);
							//console.log("added randomActivity to results");
			      	//activityLatitude = randomActivity.coordinates.latitude;
			      	//activityLongitude =  randomActivity.coordinates.longitude;

			      	this.setState({activities: this.state.activities.concat([randomActivity])})
			      	this.setState({activityNames: this.state.activityNames.concat([randomActivity.name])})
			      	clonedActivities = clonedActivities.filter((a) => {
			      		return a.name !== randomActivity.name
			      	})
						}
					}
					console.log(this.state.activityNames);
					for (let i = 0; i < this.state.activities.length; i++) {
						const activityLatitude = this.state.activities[i].coordinates.latitude;
						const activityLongitude = this.state.activities[i].coordinates.longitude;
						this.foodSearch(activityLatitude, activityLongitude);
					}
	      	// console.log("HERE IS CLONED RESULTS");
	      	// console.log(clonedActivities);
	      	// while (true) {
	      	// 	console.log("inside activity while loop");
	      	// 	const randomActivity = clonedActivities[Math.floor(Math.random() * clonedActivities.length)];
		      // 	if (randomActivity && !this.state.activityNames.includes(randomActivity.name)) {
					// 		console.log(randomActivity);
					// 		console.log("added randomActivity to results");
			    //   	activityLatitude = randomActivity.coordinates.latitude;
			    //   	activityLongitude =  randomActivity.coordinates.longitude;
					//
			    //   	this.setState({activities: this.state.results.concat([randomActivity])})
			    //   	this.setState({activityNames: this.state.resultNames.concat([randomActivity.name])})
			    //   	clonedActivities = clonedActivities.filter((a) => {
			    //   		return a.name !== randomActivity.name
			    //   	})
			    //   	//this.foodSearch(activityLatitude, activityLongitude)
			    //   	break;
		      // 	}
	      	// }
				}

      }
    );
	}

	foodSearch(latitude, longitude) {
		console.log("here is food search");
		//const tinaFaveFoods = ["Chinese", "Pasta", "Sushi", "Ramen", "Pho",];
		request(
	    {
	      url: `http://localhost:3001/search/restaurants`,
	      method: 'POST',
	      json: {
	      	days: this.state.days * 3,
	      	latitude: latitude,
	      	longitude: longitude,
	      },
	    },
      (err, httpResponse, foodData) => {
      	let clonedFood = foodData.results.businesses;
				console.log("clonedFood: ", clonedFood)
      	if (clonedFood && clonedFood.length > 0) {
      		while (true) {
	      		const randomRestaurant = clonedFood[Math.floor(Math.random() * clonedFood.length)];

		      	if (randomRestaurant && !this.state.restaurantNames.includes(randomRestaurant.name)) {
							console.log("added random restaurant to results");
			      	this.setState({restaurants: this.state.restaurants.concat([randomRestaurant])})
			      	this.setState({restaurantNames: this.state.restaurantNames.concat([randomRestaurant.name])})
			      	clonedFood = clonedFood.filter((f) => {
			      		return f.name !== randomRestaurant.name
			      	})
			      	console.log(this.state.restaurantNames);
			      	break;
		      	}
	      	}
      	} else {
					this.setState({restaurants: this.state.restaurants.concat([{name: "No Good Restaurants Nearby"}])})
					this.setState({restaurantNames: this.state.restaurantNames.concat(["No Good Restaurants Nearby"])})
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
		const activities = this.state.activities;
		const restaurants = this.state.restaurants;
		if (activities.length === restaurants.length) {
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
			console.log("activities: ", activities)
			console.log("restaurants: ", restaurants)
			console.log("interleaved: ", interleaved)
			if (interleaved.length === 0) {
				return (<div></div>)
			} else {
				const list = interleaved.map((result) => {
					console.log("result: ", result)
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
