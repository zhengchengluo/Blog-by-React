require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class ImgFigure extend React.Component {
	/*
	*imgfigure点击处理函数
	*/
	handleClick(e) {
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		}else {
			this.props.center();
		}
		e.stopPagation();
		e.preventDefault();
	}
	render () {
		let styleObj = {};

		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		if (this.props.arrange.rotate) {
			(['MozTransform','msTransform','WebkitTransform','transform']).foreach(value => {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			})
		}

		if (this.props.arrange.isCenter) {
			styleObj.zIndex = 11;
		}

		let imgFigureClassName = 'img-figure';
			imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageUrl}
					 alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}

/*
*控制组件
*/
class ControllUnit extend React.Component {
	handleClick (e) {
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}

		e.preventDefault();
		e.stopPagation();
	}
	render () {
		let controllUnitClassName = "controll-unit";

		if (this.props.arrange.isCenter) {
			controllUnitClassName += ' is-center';

			if (this.props.arrange.isInverse) {
				controllUnitClassName += ' is-inverse';
			}
		}

		return (
			<span className={controllUnitClassName} onClick={this.handleClick}>
			</span>
			)
	}	
}

/*
*画廊组件，包含imgfigure和controllunit组件
*/
class galleryComponent extend React.Component {
	static constant = {
		centerPos: {
			left: 0,
			top: 0
		},
		hPosRange: {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		},
		vPosRange: {
			x: [0, 0],
			topY: [0, 0]
		}
	}
	/*
	*翻转图片
	*@param index 传入当前被执行inverse操作的图片对应的图片信息数组的index值
	*@return {Function} 这是一个闭包函数
	*/
	inverse (index) {
		return () => {
			let imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
		};
	}
	
	/*
	*重新布局所有图片
	*@param centerIndex 指定居中排布图片的索引
	*/
	rearrange (centerIndex) {
		let imgsArrangeArr = this.state.imgsArrangeArr,
			constant = this.constant,
			centerPos = constant.centerPos,
			hPosRange = constant.hPosRange,
			vPosRange = constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			hPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.floor(Math.random() *2),
			topImgSpliceIndex = 0,

			imgsArrangeArrCenterArr = imgsArrangeArr.splice(centerIndex, 1);

			//默认第一张图片居中，居中的图片不需要旋转
			imgsArrangeArrCenterArr[0] = {
				pos: centerPos,
				rotate: 0,
				isCenter: true
			}

			//取出要布局上侧的图片信息
			topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			//布局位于上侧的图片
			imgsArrangeTopArr.forEach( (value, index) => {
				imgsArrangeTopArr[index] = {
					pos: {
						top: getRangeRandom(vPosRangeY[0], vPosRangeTopY[1]),
						left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
					},
					rotate: get30DegRandom(),
					isCenter: false
				}
			})
			//布局左右两侧的图片
			for (let i =0,j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
				let hPosRangeLORX = null;

				if (i < k) {
					hPosRangeLORX = hPosRangeLeftSecX;					
				} else {
					hPosRangeLORX = hPosRangeRightSecX;
				}

				imgsArrangeArr[i] = {
					pos: {
						top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
						left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
					}
				}
			}

			if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
			}

			imgsArrangeArr.splice(centerIndex, 0,imgsArrangeArrCenterArr[0]);

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
	}

	render () {

	}
}