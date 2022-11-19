# picoweb

A fast, lightweight, simple, and modular web framework.

# Basic Example

```javascript
import { createElement, render } from '@picoweb/core';

function App() {
	return createElement("h1", "Hello, World!");
}

render(document.getElementById("app"), createElement(App));
```