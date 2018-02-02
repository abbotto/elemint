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
 */
var animateKill;
// Fallback
if (!window.requestAnimationFrame) {
	animateKill = function animateKill(tag) {
		interval({
			tag: tag,
			cancel: true
		});
	};
}
else {
	animateKill = function animateKill(tag) {
		// Cancel the animation using it's reference name
		window.cancelAnimationFrame(animations.cache[tag]);
		// Clear the animation from the RAF animations object
		var isCached = !!animations.cache[tag];
		delete animations.cache[tag];

		return isCached;
	};
}
