require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

class LoginComponent extends React.Component {
	constructor () {
		super();
		this.state = {
			name: '',
			password: ''
		}
	}
	handleNameChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}
	handlePswChange = (e) => {
		this.setState({
			password: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();

		let name = this.state.name.trim();
		let password = this.state.password.trim();

		if (!name || !password) {return;}
		let data = new FormData(ReactDOM.findDOMNode(this.refs.form))
		console.log(data)
		fetch('/login',{
			method: 'post',
			headers: {
	   			"Content-Type": "application/x-www-form-urlencoded"
  			},
			body: 'name=' + name + '&password=' + password
		}).then(response => {
			if (response.ok) {
				// return response.json().then(json =>{
				// 	//路由跳转文章列表页
				// 	alert(json)
				// })
			}
		})
	
	}
	render () {
		return (
			<form ref='form' method='post' action='/login' onSubmit={this.handleSubmit}>
				<h2>登录</h2>
				<input type='text' name='name' onChange={this.handleNameChange} value={this.state.name} />
				<input type='text' name='password' onChange={this.handlePswChange} value={this.state.password} />
				<input type='submit' value='登录' />
			</form>
		)
	}
}

export default LoginComponent;