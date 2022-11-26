// @ts-ignore
import { createElement, render } from '@picoweb/core';
// @ts-ignore
import { createState } from '@picoweb/state';
// @ts-ignore
import { createWebsocket } from '@picoweb/websocket';

function App() {
	let value = createState("Waiting for connection...");
	let socket = createWebsocket("ws://localhost:3000");
	let text = createElement("h1");

	socket.subscribe((event: string, data: string) => {
		if (event == "message") {
			value.set(data);
		}
	});

	socket.subscribe((event: string, connection: any) => {
		if (event == "open") {
			setInterval(() => {
				connection.send("ping");
			}, 1000);
		}
	});

	text.bindContents(value);

	value.unfreeze();
	socket.connect();

	return text;
}

render(document.getElementById("app"), createElement(App));
