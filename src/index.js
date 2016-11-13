import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Gallery from './components/Gallery';

let imgsData = [
	{
		fileName: '1.jpg',
		title: 'heaven of time',
		desc: 'this lksdajfla'
	},
	{
		fileName: '2.jpg',
		title: 'second of time',
		desc: 'this lksdajfla'
	},
	{
		fileName: '3.jpg',
		title: 'third of time',
		desc: 'this lksdajfla'
	},
	{
		fileName: '4.jpg',
		title: 'fourth of time',
		desc: 'this lksdajfla'
	},
	{
		fileName: '5.jpg',
		title: 'five of time',
		desc: 'this lksdajfla'
	}
];
imgsData = (function(imgsDataArr){
	imgsDataArr.forEach((value,index)=> {
		imgsDataArr[index].imgURL = '../images/' + value.fileName;
	})
	return imgsDataArr;
})(imgsData)

// Render the main component into the dom
ReactDOM.render(<Gallery data={imgsData}/>, document.getElementById('app'));
