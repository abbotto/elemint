/**
 * @private
 * @description
 * CancelAnimationFrame handler.
 */
var CAF;
if (!window.requestAnimationFrame) {
	CAF = function CAF(tag) {
		interval({
			tag: tag,
			cancel: true
		});
	};
}
else {
	CAF = function CAF(tag) {
		// Cancel the animation using it's reference name
		window.cancelAnimationFrame(animations.cache[tag]);
		// Clear the animation from the RAF animations object
		var isCached = !!animations.cache[tag];
		delete animations.cache[tag];

		return isCached;
	};
}
