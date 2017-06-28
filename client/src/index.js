import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Food from './components/food'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	(
		<div>
			<App />
			<Survey />
			{/*<Food /> */}
		</div>
	), 
	document.getElementById('root'));
registerServiceWorker();