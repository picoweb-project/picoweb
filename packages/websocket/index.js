import { PubSub } from '../pubsub';

class WebsocketConnection extends PubSub {
	constructor(url) {
		super();
		this.url = url;
		this._socket = null;
	}

	connect() {
		this.unfreeze();

		let connection = this;

		this._socket = new WebSocket(this.url);

		this._socket.addEventListener("open", (e) => {connection.publish("open", connection)});
		this._socket.addEventListener("close", (e) => {connection.publish("close", e.wasClean, connection)});
		this._socket.addEventListener("message", (e) => {connection.publish("message", e.data, connection)});
	}

	send(data) {
		this._socket.send(data);
	}
}

function createWebsocket(url) {
	return new WebsocketConnection(url);
}

export { createWebsocket };