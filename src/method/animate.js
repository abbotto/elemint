/**
 * @memberof $
 * @method $.animate
 *
 * @description
 * Manage DOM animations.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill' methods.
 *
 * @example
 * $.animate;
 */
var animate = {
	/**
	 * @memberof $
	 * @method animate/set
	 *
	 * @description
	 * Configure and start a DOM animation.
	 *
	 * @param {Object} config Animation configuration.
	 *
	 * @example
	 * var config = {
	 *     tag: 'myAnimation',
	 *     callback: function(){...}
	 * };
	 *
	 * $.animate.set(config);
	 */
	set: function animateSet(config) {
		var defaultSettings = {
			tag: null,
			callback: noop()
		};

		// Set the new params
		config = merge(defaultSettings, config);
		var tag = config.tag;
		var callback = config.callback;
		var cancel = config.cancel;

		if (tag && !callback) {
			return !!animations.cache[name];
		}
		else if (tag && callback) RAF.callback(tag, callback);
	},
	/**
	 * @memberof $
	 * @method animate/kill
	 *
	 * @description
	 * Kill a DOM animation.
	 *
	 * @param {string} tag Animation identification.
	 *
	 * @example
	 * $.animate.kill(tag);
	 *
	 */
	kill: CAF
};
