require('normalize.css/normalize.css');
require('styles/App.css');

import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';

function getStyles(props,context) {
	// const {} = props;
	return {
		root: {
				
		},
		ul: {

		}
	}
}

export default class FoldMenu extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isExpand: false
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick () {		
		this.setState({
			isExpand: !this.state.isExpand
		})		
	}
	render () {
		const data = this.props.data;
		const {courseName,articles} = data;
		const getMsg = this.props.getArticle;

		let list = [],
			ulStyle = {display: this.state.isExpand ? 'block':'none'};

		if (articles && articles.length) {
			articles.forEach( (value, index) => {
				list.push((<li key={index} onClick={this.props.getMsg(value.id)}>{value.title}</li>));
			})
		}
		
		return (
			<div onClick={this.handleClick}>
				<h3>{courseName}</h3>			 
				<ul style={ulStyle}>
					{list}
				</ul>
			</div>
			)
	}
}