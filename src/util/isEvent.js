/**
 * @private
 * @description
 * Test if an event is supported
 *
 * @param {String}
 * @return {Boolean}
 */

// https://developer.mozilla.org/en-US/docs/Web/Events
const exclusiveEvents = {
	abort: document.createElement('img'),
	change: document.createElement('input'),
	error: document.createElement('img'),
	load: document.createElement('img'),
	reset: document.createElement('form'),
	select: document.createElement('input'),
	submit: document.createElement('form')
};

const generalEvents = document.createElement('div');

function isEvent(eventName) {
	const subject = exclusiveEvents[eventName] || generalEvents;

	eventName = 'on' + eventName;

	let eventExists = eventName in subject;

	if (!eventExists) {
		subject.setAttribute(eventName, 'return;');
		eventExists = typeof subject[eventName] === 'function';
	}

	return eventExists;
}
