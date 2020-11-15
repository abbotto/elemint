/**
 * @description
 * Setup an event listener on an element
 *
 * @memberof $
 * @method event.set
 *
 * @param {Array|Element} target The target element(s)
 * @param {Object} config Event listener configuration
 *
 * @example
 * const config = {
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

const tactileMap = {
	mousedown: 'onmousedown' in window ? 'mousedown' : 'touchstart',
	mousemove: 'onmousemove' in window ? 'mousemove' : 'touchmove',
	mouseout: 'onmouseout' in window ? 'mouseout' : 'touchcancel',
	mouseup: 'onmouseup' in window ? 'mouseup' : 'touchend',
	touchcancel: 'ontouchcancel' in window ? 'touchcancel' : 'mouseout',
	touchend: 'ontouchend' in window ? 'touchend' : 'mouseup',
	touchmove: 'ontouchmove' in window ? 'touchmove' : 'mousemove',
	touchstart: 'ontouchstart' in window ? 'touchstart' : 'mousedown'
};

function eventSet(config, cb) {
	const args = this;
	const subject = args[0];
	let i = args[1];

	const evt = config.on ? tactileMap[config.on] || config.on : config;

	if (config.on) {
		const tag = config.tag;
		const callback = config.callback;

		config = Object.assign(
			{},
			{
				tag: '',
				on: '',
				target: false,
				callback: () => {},
				limit: false
			},
			config
		);

		// Save the event
		if (tag && !events.job[tag] && callback) {
			events.job[tag] = config;
		}

		// eslint-disable-next-line no-inner-declarations
		function eventAction(e) {
			if (!events.job[tag]) return false;

			// Normalize the event
			e = e || window.event;
			e.source = e.source || e.srcElement;

			const source = e.target || e.source;
			const newTarget = events.job[tag].target;
			const callback = events.job[tag].callback;

			// Basic event handler
			if (!newTarget) {
				// One-time events
				if (events.job[tag].limit === true) {
					this.removeEventListener(e.type, eventAction, 0);
					if (events.job[tag]) delete events.job[tag];
				}

				callback.call(this, e);
			} else if (newTarget) {
				// Event delegation
				const delegatee = [].slice.call(this.querySelectorAll(newTarget));
				const n = delegatee.length;

				while (i--) {
					if (source === delegatee[n]) {
						// One-time event
						if (limit === true) {
							this.removeEventListener(e.type, eventAction, 0);
							if (events.job[tag]) delete events.job[tag];
						}
						callback.call(e.source, e);
					}
				}
			}
		}

		// Uses a named function that can be referenced for canceling one-time events
		while (i--) {
			subject[i].addEventListener(evt, eventAction, 0);
		}
	} else {
		while (i--) {
			subject[i].addEventListener(evt, bind(cb, subject[i]), 0);
		}
	}
}
