import React from 'react';
import request from 'request';
import _ from 'underscore';
import Trip from './trip';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Quiz extends React.Component {

	constructor(props) {
	  	super(props);
		this.state = {
		    isIntro: true
		};
	}

	renderSubmitButton() {
		let component;
		if (this.state.isIntro) {
			component = (
				<nav>
			    	<Link to="/trip">Plan Trip</Link>
			    </nav>
			)
			this.setState({isIntro: false});
		} else {
			component = (
				<div>
				</div>
			)
		}


		return component;
	}

	render() {
		return (
			<div>
				<nav>
			    	<Link to="/trip">Plan Trip</Link>
			    </nav>
			    <div>
			    	<Route path="/trip" component={Trip}/> 
			    </div>

			</div>
		)
	}
}

export default Quiz;