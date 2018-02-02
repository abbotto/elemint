/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
const expect = chai.expect;
const toArray = Function.prototype.call.bind(Array.prototype.slice);
const toString = Function.prototype.call.bind(Object.prototype.toString);

const camelize = function camelize(string) {
	return string.replace(reCamelize, c => (c ? c.toUpperCase() : ''));
};

const getStyle = function getStyle(el, prop) {
	if (el.currentStyle) {
		return el.currentStyle[camelize(prop)];
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);
	}

	return el.style[camelize(prop)];
};
