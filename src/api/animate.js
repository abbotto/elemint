/**
 * @memberof $
 * @method animate
 *
 * @description
 * Manage DOM animations.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, void' methods.
 *
 * @example
 * $.animate;
 */

const animate = {
	set: animateSet,
	void: animateVoid
};
