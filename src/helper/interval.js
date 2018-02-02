/**
 * @private
 * @description
 * Create precise timers for DOM actions.
 *
 * @param {Object} settings The settings that are used to configure each timer.
 * @returns {Function} callback The function that will be executed at each interval.
 *
 * @example
 * var settings = {
 *     tag: null,
 *     duration: 1000,
 *     cycle: 0,
 *     delay: 0,
 *     done: function(),{...}
 *     callback: function(),{...}
 *     cancel: false
 * };
 *
 * interval(settings);
 */
// Cache
var interval = function interval(settings) {
	var defaultSettings = {
		tag: null,
		duration: 1000,
		cycle: 0,
		delay: 0,
		done: noop(),
		callback: noop(),
		cancel: false
	};
	// Mark the function start time
	var startTime = Date.now();
	// Set the new parameters
	settings = merge(defaultSettings, settings);
	var tag = settings.tag;
	var duration = settings.duration;
	var cycle = settings.cycle;
	var done = settings.done;
	var callback = settings.callback;
	var delay = settings.delay;
	var cancel = settings.cancel;
	// Does a named timer exist?
	if (tag && duration === 0 && cycle === 0 && cancel === false) {
		return !!timers.cache[tag];
	}
	// Initialize the timer
	if (cancel === false && !timers.cache[tag]) {
		// Initial setup
		var interval = 0;
		var setDuration = duration;
		var elapsed = 0;
		var intervals = 0;
		var delta;
		var diff;
		// The timer
		var instance = function () {
			interval += 1;
			elapsed = Date.now() - startTime - intervals;
			if (interval * duration > Date.now() - startTime) {
				elapsed = interval * duration - intervals;
			}
			if (cycle !== 0 && interval === cycle && !!done) {
				return done();
			}
			// If we haven't passed the cycle threshold
			if ((interval <= cycle && cycle !== 0) || cycle === 0) {
				delta = elapsed - duration;
				// Call to action
				callback();
				// Update the duration
				setDuration = duration - delta;
				diff = Math.abs(setDuration - duration);
				intervals += elapsed;
				setDuration -= Math.round(diff);
				// Cache the timer if an id was provided
				(tag) ? timers.cache[tag] = window.setTimeout(instance, setDuration) : window.setTimeout(instance, setDuration);
			}
		};
		// Create a delay if one was requested
		(delay > 0) ? window.setTimeout(instance, delay) : instance();
	}
	// Cancel the timer
	else if (cancel === true && timers.cache[tag]) {
		clearTimeout(timers.cache[tag]);
		delete timers.cache[tag];
	}
};
