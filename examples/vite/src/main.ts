// @ts-ignore
import { createElement, render } from '@picoweb/core';
// @ts-ignore
import { createState } from '@picoweb/state';

function Counter() {
	let button = createElement("button");
	let count = createState(0);
	
	button.on("click", () => {
		count.setAsync((value: any) => {return value + 1;});
	});
	
	button.bindContents(count);
	
	count.unfreeze();
	
	return button;
}

function App() {
	return createElement("div", {}, [
		createElement("h1", "Vite + picoweb"),
		createElement(Counter)
	]);
}

render(document.getElementById("app"), createElement(App));
