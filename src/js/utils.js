
function $$(selector, optContextElement) {
	var el = optContextElement || document;
	return el.querySelectorAll(selector);
}

function loc(s) {
	return locStrings[s] || s;
}
