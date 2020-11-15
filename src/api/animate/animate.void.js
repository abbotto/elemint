/**
 * @memberof $
 * @method animate.void
 *
 * @description
 * Void a DOM animation.
 *
 * @param {string} tag Animation identification.
 *
 * @example
 * $.animate.void(tag);
 */

function animateVoid(tag) {
	// Cancel the animation using it's reference name
	window.cancelAnimationFrame(animations.job[tag]);

	// Clear the animation from the raf animations object
	const isJob = !!animations.job[tag];
	delete animations.job[tag];

	return isJob;
}
