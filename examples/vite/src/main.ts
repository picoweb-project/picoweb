// @ts-ignore
import { createElement, render, createState } from '@picoweb/picoweb';

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
