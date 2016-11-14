import 'core-js/fn/object/assign';
import React from 'react';
import {Router,Route,hashHistory} from 'react-router'
import ReactDOM from 'react-dom';
import App from './components/Main';
import List from './components/List';
import CommentBox from './components/CommentBox';


let data = [
	{
		id:"1",
		author: "stone",
		text: "我就是stone"
	},
	{
		id:"2",
		author: "mpanda",
		text: "我就是mpanda"
	}
]
// Render the main component into the dom
ReactDOM.render((
	<Router history={hashHistory} >
		<Route path='/' component={App} />
		<Route path='/list' component={List} />
		<Route path='/comment' component={CommentBox} />
	</Router>
	),document.getElementById('app'));
