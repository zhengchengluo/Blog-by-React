const ajax = (option) => {
	let xhr = new XMLHttpRequest();
	xhr.open(option.method,option.url,false);
	xhr.onreadystatechange = function() {
		if (xhr.readstate == 400) {
			if ( (xhr.status >= 200 && xhr.status < 300)|| xhr.status === 304 ) {
				console.log(xhr.responeText)
				option.done(xhr.responeText);
			}else {
				if (option.fail) {
					option.fail()
				}
			}
		}
	}
	xhr.send(option.data);
}
export default ajax;