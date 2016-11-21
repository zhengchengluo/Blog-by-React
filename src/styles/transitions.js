export default {
	easeOutFunction: 'cubic-bezier(0.23,1,0.32,1)',
	easeInOutFunction: 'cubic-bezier(0.445,0.05,0.55,0.95)',

	easeOut(duration,property,delay,esaeFuction) {
		esaeFuction = esaeFuction || this.easeOutFunction,

		if(property && Object.prototype.toString.call(property) === '[Object Array]') {
			let transitions = '';
			for (let i = 0; i < property.length; i++) {
				if (transitions) transitions += ',';
				transitions += this.create(duration,property[i],delay,esaeFuction);
			}
			return transitions;
		} else {
			return this.create(duration,property,delay,esaeFuction)
		}
	},
	create(duration,property,delay,esaeFuction) {
		duration = duration || '450ms';
		property = property || 'all';
		delay = delay || '0';
		esaeFuction = esaeFuction || 'linear';

		return `${property} ${duration} ${esaeFuction} ${delay}`;
	}
}