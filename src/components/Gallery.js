require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

function getArrangeRandom(low,high) {
	return (Math.ceil(Math.random() * (high - low)) + low);
}

function get30DegRandom() {
	return ((Math.random() > 0.5)?'':'-')+Math.ceil(Math.random() * 30);
}
class ImgFigure extends React.Component {
	constructor (props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick (e) {
		//let index = this.props.index;
		//是否居中，如果是居中则判断是否正面
		if (this.props.arrange.isCenter) {
			this.props.inverse()
		}else {
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	render () {
		let arrange = this.props.arrange,
				left = arrange.pos.left,
				top = arrange.pos.top;
		
		let styleObj = {
			left: left + 'px',
			top: top + 'px'
		};

		if (this.props.arrange.rotate){
			['MozTransform','msTransform','WebkitTransform','transform'].forEach( value => {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}

		if (this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}
		let imgFigureClass = 'img-figure';
		imgFigureClass += this.props.arrange.isInverse ? ' is-inverse':'';
		console.log(this.props.arrange.rotate)
		return (
				<figure className={imgFigureClass} style={styleObj} onClick={this.handleClick}>
					<img src={this.props.data.imgURL} alt={this.props.data.title}/>
					<figcaption>
						<h2 className='img-title'>{this.props.data.title}</h2>
						<div className='img-back' onClick={this.handleClick}>
							<p>{this.props.data.desc}</p>
						</div>
					</figcaption>					
				</figure>
			)
	}
}

class ControllerUnit extends React.Component {
	constructor (props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick () {
		//let index = this.props.index;
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	render () {
		let unit = 'controller-unit';

		if (this.props.arrange.isCenter) {
			unit += ' is-center';

			if (this.props.arrange.isInverse) {
				unit += ' is-inverse';
			}
		}
		//先删除闭合符号/，以便编辑器识别关键字
		return (
				<span className={unit} onClick={this.handleClick}></span>
			)
	}
}

class GalleryComponent extends React.Component {
	constructor () {
		super();
		this.Constant = {
			centerPos: {
				left: 0,
				top: 0
			},
			hPosArrange: {
				leftSecX: [0,0],
				rightSecX: [0,0],
				y: [0,0]
			},
			vPosArrange: {
				x:[0,0],
				topY: [0,0]
			},
			isCenter: false,
			isInverse: false
		}

		this.state = {
			imgsArrangeArr: []
		}
	}
	rearrange(index) {
		let imgsArrangeArr = this.state.imgsArrangeArr,
				constant = this.Constant,
				centerPos = constant.centerPos,
				hPosLeftX = constant.hPosArrange.leftSecX,
				hPosRightX = constant.hPosArrange.rightSecX,
				hPosArrangeY = constant.hPosArrange.y,
				vPosArrangeX = constant.vPosArrange.x,
				vPosArrangeTopY = constant.vPosArrange.topY,
		
				imgsTopArr = [],
				imgsTopNum = Math.floor(Math.random() * 2), //上侧分布0张或者1张
				topImgSpliceIndex = 0,
				imgsCenter = imgsArrangeArr.splice(index,1);	//剔除居中的图片

		//设置居中图片
		imgsCenter[0] = {
			pos: centerPos,
			rotate: 0,
			isCenter: true
		};
		//计算上侧图片布局
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - imgsTopNum));
		imgsTopArr = imgsArrangeArr.splice(topImgSpliceIndex,imgsTopNum);

		for(let i = 0,j = imgsTopArr.length; i < j; i++) {
			imgsTopArr[i] = {
				pos: {
					left: getArrangeRandom(vPosArrangeX[0],vPosArrangeX[1]),
					top: getArrangeRandom(vPosArrangeTopY[0],vPosArrangeTopY[1])
				},
				rotate: get30DegRandom(),
				isCenter: false,
				isInverse: false
			}
		}
		//计算左侧、右侧图片布局
		for (let i = 0,j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
			let hPosArrangeLORX = null;
			if (i < k){
				hPosArrangeLORX = hPosLeftX;
			} else {
				hPosArrangeLORX = hPosRightX;
			}
			imgsArrangeArr[i] ={
				pos: {
					left: getArrangeRandom(hPosArrangeLORX[0],hPosArrangeLORX[1]),
					top: getArrangeRandom(hPosArrangeY[0],hPosArrangeY[1])
				},
				rotate: get30DegRandom(),
				isCenter: false,
				isInverse: false
			}
		}
		//console.log(imgsArrangeArr)

		//重置imgsArrangeArr
		if (imgsTopArr && imgsTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsTopArr[0]);
		}
		imgsArrangeArr.splice(index,0,imgsCenter[0]);
	
		this.setState({
			imgsArrangeArr: imgsArrangeArr
		})
	}
	inverse (index) {
		return () => {			
			let imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			console.log(imgsArrangeArr)
			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
		}
	}
	center (index) {
		return () => {
			this.rearrange(index);
		}
	}
	componentDidMount () {
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
				stageW = stageDOM.scrollWidth,
				stageH = stageDOM.scrollHeight,
				halfStageW = Math.ceil(stageW / 2),
				halfStageH = Math.ceil(stageH / 2);

		let imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
				imgW = imgDOM.scrollWidth,
				imgH = imgDOM.scrollHeight,
				halfImgW = Math.ceil(imgW / 2),
				halfImgH = Math.ceil(imgH / 2);

		//给居中图片设置坐标
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}
		
		//给左侧、右侧区域坐标范围赋值
		this.Constant.hPosArrange.leftSecX[0] = - halfImgW;
		this.Constant.hPosArrange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosArrange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosArrange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosArrange.y[0] = - halfImgH;
		this.Constant.hPosArrange.y[1] = stageH - halfImgW;
		
		//给上侧区域设置坐标范围
		this.Constant.vPosArrange.x[0] = halfStageW - halfImgW * 3;
		this.Constant.vPosArrange.x[1] = halfStageW;
		this.Constant.vPosArrange.topY[0] =  - halfImgH;
		this.Constant.vPosArrange.topY[1] = halfStageH - halfImgH * 3;
		
		console.log(this.Constant.vPosArrange.topY)
		this.rearrange(0);
	}
	render () {
		let imgFigures = [],
				controllerUnits = [],
				imagesData = this.props.data;

		imagesData.forEach((value,index) => {
			//初始化imgsArrangeArr，每次重新渲染imgsArrangeArr都不会归零，因为进行了有值判断
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isCenter: false,
					isInverse: false
				}
			}
			//注意闭合标签
			imgFigures.push(<ImgFigure ref={'imgFigure'+index} key={index} data={value} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}></ImgFigure>);
			controllerUnits.push(<ControllerUnit key={index} data={value} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}></ControllerUnit>);	
		});
		return (
			<section className='gallery' ref='stage' >
				<section className='img-sec'>
					{imgFigures}
				</section>
				<section className='controller-nav'>
					{controllerUnits}
				</section>
			</section>
			)
	}
}

GalleryComponent.defaultProps = {
};
export default GalleryComponent;