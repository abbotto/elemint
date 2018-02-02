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
 *     callback: () => {...}
 * };
 *
 * $.animate.set(config);
 */
function animateSet(config) {
	var defaultSettings = {
		tag: null,
		callback: noop()
	};

	config = merge(defaultSettings, config);

	var tag = config.tag;
	var callback = config.callback;
	var cancel = config.cancel;

	if (tag && !callback) {
		return !!animations.cache[name];
	}
	else if (tag && callback) RAF.callback(tag, callback);
}
