import 'core-js/fn/object/assign';
import React from 'react';
import {Router,Route,hashHistory} from 'react-router'
import ReactDOM from 'react-dom';
import App from './components/Main';
import List from './components/List';
// Render the main component into the dom
ReactDOM.render((
	<Router history={hashHistory} >
		<Route path='/' component={App} />
		<Route path='/list' component={List} />
	</Router>
	),document.getElementById('app'));
