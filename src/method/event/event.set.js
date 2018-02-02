/**
 * @description
 * Setup an event listener on an element
 *
 * @memberof $
 * @method event/set
 *
 * @param {Array|Element} target The target element(s)
 * @param {Object} config Event listener configuration
 *
 * @example
 * var config = {
 *     on: '',
 *     tag: '',
 *     target: false,
 *     callback: () => {...},
 *     limit: false
 * }
 *
 * $.event(target).set(config);
 * $.event(target).set(evt, callback);
 * $(target).event.set(config);
 * $(target).event.set(evt, callback);
 */
function eventSet(config, cb) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	// Advanced configuration
	if (!config.substring) {
		var tag = config.tag;
		var callback = config.callback;
		evt = config.on;

		var eventsForMobile = {
			touchstart: ('ontouchstart' in window) ? 'touchstart' : 'mousedown',
			touchend: ('ontouchend' in window) ? 'touchend' : 'mouseup',
			touchmove: ('ontouchmove' in window) ? 'touchmove' : 'mousemove',
			touchcancel: ('ontouchcancel' in window) ? 'touchcancel' : 'mouseout',
			mousedown: ('onmousedown' in window) ? 'mousedown' : 'touchstart',
			mouseup: ('onmouseup' in window) ? 'mouseup' : 'touchend',
			mousemove: ('onmousemove' in window) ? 'mousemove' : 'touchmove',
			mouseout: ('onmouseout' in window) ? 'mouseout' : 'touchcancel'
		};

		config = merge({
			tag: '',
			on: '',
			target: false,
			callback: noop(),
			limit: false
		}, config);

		// Event fallbacks for touch vs mouse
		if (eventsForMobile[evt]) evt = eventsForMobile[evt];

		// Save the event
		if (tag && !events.cache[tag] && callback) events.cache[tag] = config;

		var eventAction = function eventAction(e) {
			if (!events.cache[tag]) return false;

			// Normalize the event
			e = e || window.event;
			e.source = e.source || e.srcElement;

			var source = e.target || e.source;
			var newTarget = events.cache[tag].target;
			var callback = events.cache[tag].callback;

			// Basic event handler
			if (!newTarget) {
				// One-time events
				if (events.cache[tag].limit === true) {
					this.removeEventListener(e.type, eventAction, 0);
					if (events.cache[tag]) delete events.cache[tag];
				}
				callback.call(this, e);
			}
			else if (newTarget) {
				// Event delegation
				var delegatee = toArray(this.querySelectorAll(newTarget));
				var n = delegatee.length;

				while (i--) {
					if (source === delegatee[n]) {
						// One-time event
						if (limit === true) {
							this.removeEventListener(e.type, eventAction, 0);
							if (events.cache[tag]) delete events.cache[tag];
						}
						callback.call(e.source, e);
					}
				}
			}
		};

		// Uses a named function that can be referenced for canceling one-time events
		while (i--) subject[i].addEventListener(evt, eventAction, 0);
	}
	// Map directly to
	else {
		while (i--) subject[i].addEventListener(config, bind(cb, subject[i]), 0);
	}
}
