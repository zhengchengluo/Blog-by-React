import React,{Component,PropTypes} from 'react';

class AppBar extends Component {
	goto(href) {
		console.log('click done')
	}
	renderRight() {
		return (<button onClick={this.goto()}></button>)
	}
	render() {
		return (<div>AppBar{this.renderRight}</div>)
	}
}
export default AppBar;