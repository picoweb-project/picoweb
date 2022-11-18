class PubSub {
	constructor() {
		this._subscribers = [];
		this._eventqueue = [];
		this._frozen = true;
	}
	
	publish() {
		if (this._frozen) {
			this._eventqueue.push(arguments);
			return;
		}
		
		for (let i = 0; i < this._subscribers.length; i++) {
			this._subscribers[i](...arguments);
		}
	}
	
	subscribe(callback) {
		this._subscribers.push(callback);
	}
	
	isFrozen() {
		return this._frozen;
	}
	
	freeze() {
		this._frozen = true;
	}
	
	unfreeze() {
		this._frozen = false;
		
		while (this._eventqueue != 0) {
			const event = this._eventqueue[0];
			
			for (let i = 0; i < this._subscribers.length; i++) {
				this._subscribers[i](...event);
			}
			
			this._eventqueue.pop(0);
		}
	}
}

export { PubSub };
