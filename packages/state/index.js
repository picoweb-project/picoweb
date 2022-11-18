import { PubSub } from '@picoweb/pubsub';

class State extends PubSub {
	constructor(initialValue) {
		super();
		this._value = initialValue;
		this._eventqueue.push([undefined, initialValue]);
	}
	
	get() {
		return this._value;
	}
	
	set(value) {
		const oldValue = this._value;
		this._value = value;
		
		this.publish(oldValue, value);
	}
	
	setAsync(callback) {
		// TODO: find a better way to do async state management
		
		let state = this;
		
		setTimeout(() => {
			state.set(callback(state.get()));
		}, 0);
	}
}

function createState(initialValue) {
	return new State(initialValue);
}

export { createState };
