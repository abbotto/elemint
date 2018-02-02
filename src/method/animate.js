/**
 * @memberof $
 * @method $.animate
 *
 * @description
 * Manage DOM animations.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, kill' methods.
 *
 * @example
 * $.animate;
 */
var animate = {
	set: animateSet,
	kill: animateKill
};
