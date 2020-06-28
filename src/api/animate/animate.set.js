/**
 * @memberof $
 * @method animate.set
 *
 * @description
 * Configure and start a DOM animation.
 *
 * @param {Object} config Animation configuration.
 *
 * @example
 * const config = {
 *     tag: 'myAnimation',
 *     callback: () => {...}
 * };
 *
 * $.animate.set(config);
 */

const animations = {
	job: {}
};

const animateDefaultSettings = {
	tag: null,
	callback: () => {}
};

function animateSet(config) {
	config = Object.assign({}, animateDefaultSettings, config);

	const tag = config.tag;
	const callback = config.callback;

	if (tag) {
		if (callback) {
			raf.callback(tag, callback);
		} else {
			return !!animations.job[tag];
		}
	}
}
