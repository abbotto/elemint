/**
 * @description
 * Manage element events
 *
 * @memberof $
 * @method $.event
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill, emit' methods.
 *
 * @example
 * $.event(element);
 */
var event = function event(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var methods = {
		/**
		 * @description
		 * Setup an event listener on an element
		 *
		 * @memberof $
		 * @method event/set
		 *
		 * @param {Array|Element} subject The target element(s)
		 * @param {Object} config Event listener configuration
		 *
		 * @example
		 * var config = {
		 *     on: '',
		 *     tag: '',
		 *     target: false,
		 *     callback: function(){...},
		 *     limit: false
		 * }
		 *
		 * $.event(element).set(evt, callback);
		 * $.event(element).set(config);
		 * $(selector).event.set(config);
		 */
		set: function eventSet(config, cb) {
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
			// Map directly to `addEventListener`
			else {
				while (i--) subject[i].addEventListener(config, cb.bind(subject[i]), 0);
			}
		},
		/**
		 * @description
		 * Stop an event listener
		 *
		 * @memberof $
		 * @method event/kill
		 *
		 * @param {Array} tagOrEventName A tag or event name for an existing event
		 * @param {Array} callback The original callback function to be used with an event name
		 *
		 * @example
		 * $.event(element).kill('tag');
		 * $.event(element).kill('eventName', callback);
		 *
		 * $(selector).event.kill('tag');
		 * $(selector).event.kill('eventName', callback);
		 */
		kill: function eventKill(tagOrEventName, callback) {
			var cancelFn = events.cache[tagOrEventName].callback || callback;

			var evt = callback
				? tagOrEventName
				: events.cache[tagOrEventName].on
			;

			while (i--) {
				subject[i].removeEventListener(evt, cancelFn.bind(subject[i]), 0);
			}

			if (events.cache[tagOrEventName]) delete events.cache[tagOrEventName];
		},
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
		 *     bubbles    : true,
		 *     cancelable : true
		 * }
		 *
		 * $.event(element).emit('eventName', config);
		 * $(selector).event.emit('eventName', config);
		 */
		emit: function eventEmit(eventName, config) {
			if (this.substring) {
				config = eventName;
				eventName = this;
			}

			var event;

			if (!config) {
				config = {
					bubbles: true,
					cancelable: true
				};
			}

			if (eventList.indexOf(eventName) < 0) {
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
				document.createEvent('HTMLEvents');
				event.initEvent(eventName, true, true);
			}
			else {
				event = document.createEventObject();
				event.eventType = eventName;
			}

			event.eventName = eventName;

			if (document.createEvent) while (i--) subject[i].dispatchEvent(event);
			else subject[i].fireEvent('on' + event.eventType, event);
		}
	};

	// Shorthand 'emit' methods for events found here:
	// https://developer.mozilla.org/en-US/docs/Web/Events
	var n = eventList.length;
	while (n--) methods[eventList[n]] = methods.emit.bind(eventList[n]);

	return methods;
};
