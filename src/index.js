import 'core-js/fn/object/assign';
import React from 'react';
import {Router,Route,hashHistory} from 'react-router'
import ReactDOM from 'react-dom';
import App from './components/Main';
import List from './components/List';
import Login from './components/Login';
//import Article from './components/Article';

// Render the main component into the dom
ReactDOM.render((
	<Router history={hashHistory} >
		<Route path='/' component={App} />
		<Route path='/list' component={List} />
		<Route path='/login' component={Login} />
	</Router>
	),document.getElementById('app'));
		
		//<Route path='/article' component={Article} />
