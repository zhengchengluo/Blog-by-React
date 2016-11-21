require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import FoldMenu from './FoldMenu';

function getStyles(props,context) {
	return {
		root: {
			position: 'absolute',
			marginLeft: '30em',
			color: '#f5f5f5'
		},
		moduleName: {
			fontSize: '24px',
			fontWeight: 'bold'
		},
		active: {
			color: 'red'
		},
		articleMenuTitle: {
			marginLeft: '10px'
		}
	}
}
/*
*侧边菜单
*/
class AsideMenu extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		const {menuData,getArticle} = this.props;
		const {module, courses} = menuData;

		let foldMenuList = [];

		if (courses && courses.length) {
			courses.forEach((value, index) => {
				foldMenuList.push((<FoldMenu key={index} data={value} getMsg={getArticle}></FoldMenu>));
			})
		}
		console.log(foldMenuList)
		return (
			<section>
				<h3>{module}</h3>
				<div>
					{foldMenuList}
				</div>
			</section>
		)	
	}
}

export default AsideMenu;