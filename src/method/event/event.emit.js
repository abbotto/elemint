/**
 * @description
 * Send an event to an element
 *
 * @memberof $
 * @method event/emit
 *
 * @param {Object} eventName The name of the event
 * @param {Object} config The config for the event
 *
 * @example
 * var config = {
 *     bubbles: true,
 *     cancelable: true
 * }
 *
 * $.event(target).emit('eventName', config);
 * $(target).event.emit('eventName', config);
 *
 * var e = $.event(target);
 * e.blur();
 * e.click();
 * e.dblclick();
 * e.focus();
 * e.keydown();
 * e.keypress();
 * e.keyup();
 * e.mousedown();
 * e.mouseenter();
 * e.mouseleave();
 * e.mousemove();
 * e.mouseout();
 * e.mouseover();
 * e.submit();
 * e.touchcancel();
 * e.touchend();
 * e.touchenter();
 * e.touchleave();
 * e.touchmove();
 * e.touchstart();
 */
function eventEmit(eventName, config) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	var event;

	if (!config) {
		config = {
			bubbles: true,
			cancelable: true
		};
	}

	if (!eventTest[eventName]) {
		if (window.CustomEvent) {
			event = new CustomEvent(eventName, config);
		}
		else if (document.createEvent) {
			document.createEvent('CustomEvent');
			event.initCustomEvent(eventName, true, true, config);
		}
	}
	else if (typeof Event === 'function') {
		event = new Event(eventName);
	}
	else if (document.createEvent) {
		event = document.createEvent('HTMLEvents');
		event.initEvent(eventName, true, true);
	}
	else {
		event = document.createEventObject();
		event.eventType = eventName;
	}

	event.eventName = eventName;

	if (document.createEvent) {
		while (i--) subject[i].dispatchEvent(event);
	}
	else {
		subject[i].fireEvent('on' + event.eventType, event);
	}
}
