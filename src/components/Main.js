require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Gallery from './Gallery';
import imgsData from '../mocks/gallery.json';

let imgsDataArr = (function(imgsDataArr){
	imgsDataArr.forEach((value,index)=> {
		imgsDataArr[index].imgURL = '../images/' + value.fileName;
	})
	return imgsDataArr;
})(imgsData)

class AppComponent extends React.Component {
  render() {
    return (
      <Gallery data={imgsDataArr}></Gallery>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
