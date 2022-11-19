function createElement(type, props, children) {
	let element = null;
	
	let _props = typeof props == "undefined" ? {} : props;
	
	if (typeof props == "string") {
		_props = {innerText: props};
	}
	
	if (typeof type == "string") {
		element = document.createElement(type);
		Object.assign(element, _props);
	} else {
		element = type(_props);
	}
	
	if (typeof children != "undefined") {
		for (let i = 0; i < children.length; i++) {
			element.appendChild(children[i]);
		}
	}
	
	if (Object.keys(_props).includes("innerText")) {
		element.innerText = _props.innerText;
	}
	
	element.on = element.addEventListener;
	
	element.bind = (state, prop, callback) => {
		if (typeof callback == "undefined") {
			state.subscribe((value) => {
				element[prop] = value;
			});
			
			return;
		}
		
		state.subscribe((value, oldValue) => {
			element[prop] = callback(value, oldValue);
		});
	}
	
	element.bindContents = (state, callback) => {
		element.bind(state, "innerText", callback);
	}
	
	return element;
}

function render(element, root) {
	element.appendChild(root);
}

export {
	createElement,
	render
};
