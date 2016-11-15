require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
// import fetch from 'fetch';


class Comment extends React.Component {
	rawMarkup () {
		let rawMarkup = marked(this.props.children.toString(),{sanitize:true});
		return {__html: rawMarkup}
	}
	render () {
		return (
			<div className='comment'>
				<h2 className='comment-author'>
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
			</div>
			)
	}
}

class CommentList extends React.Component {
	render () {
		let commentNodes = this.props.data.map((value,key) => {
			return <Comment author={value.author} key={value.id}>{value.text}</Comment>
		})
		return (
			<div className='comment-list'>
			 	{commentNodes}
			</div>
			)
	}
}

class CommentForm extends React.Component {
	constructor () {
		super();
		this.state = {
			author: '',
			text: ''
		}
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
	}
	handleAuthorChange (e) {
		this.setState({
			author: e.target.value
		})
	}
	handleTextChange (e) {
		this.setState({
			text: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		let author = this.state.author.trim();
		let text = this.state.text.trim();

		if (!text || !author) {
			return;
		}

		this.props.onSubmitCommit({
			author: author,
			text: text
		})
	}
	render () {
		return (
			<form className='comment-form' onSubmit={this.handleSubmit}>
				<input type='text' 
					   onChange={this.handleAuthorChange}
					   placeholder='输入姓名'
					   value={this.state.author} />
				<input type='text' 
					   onChange={this.handleTextChange}
					   placeholder='输入评论'
					   value={this.state.text} />
			    <input type='submit' value='提交' />	   
			</form>
			)
	}
}

class CommentBox extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			data: this.props.commentData
		}
	}
	handleSubmitCommit (data) {
		fetch('api/commit',{
			method: 'post',
			body: data
		}).then(response => {
			if (response.ok) {
				return response.json().then(json =>{
					this.setState({
						data: this.state.data.concat(json)
					})
				})
			}
		})
	}
	render () {
		return (
			<div className='comment-box'>
				I am comment-box
				<h1>Comment</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onSubmitCommit={this.handleSubmitCommit}/>
			</div>
			)
	}
}

/*
*文章详情组件
*/
class ArticleBox extends React.Component {
	render () {
		
		return (
			<div className='article-box'>
				<h1></h1>
				<div className='article-tip'>
					<span>作者:</span>
					<span>时间:</span>
				</div>
				<p></p>
			</div>
		)
	}
}
class Article extends React.Component {
	constructor () {
		super();
		this.state = {
			data: []
		}
	}
	componentDidMount () {
		//原生fetch接口，只有chrome和Firefox支持
		//获取评论数据，评论与文章详情在一个数据结构？那分页怎么处理
		fetch('./mocks/comment.json')
			.then( response => {
				if (response.ok) {
					return response.json().then(json => {
						console.log(json);
						this.setState({
							data: json
						})
					});
				}
			})
			.catch(function(err) {
				console.log(err)
			})
	}
	render () {
		return (
			<section>
				<ArticleBox articleData={}/>
				<CommentBox commentData={this.state.data} />
			</section>
			)
	}
}
export default Article;