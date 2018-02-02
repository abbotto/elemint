/**
 * @private
 * @param {String}
 * @param {Function}
 */
var RAF = {};
if (!window.requestAnimationFrame) {
	RAF.callback = function (tag, callback) {
		interval({
			tag: tag,
			duration: 1000 / 60,
			callback: function () {
				callback();
			}
		});
	};
}
else {
	RAF.callback = function (tag, callback) {
		var raf = function () {
			// Run the animation
			callback();

			// Save a reference to the animation
			animations.cache[tag] = requestAnimationFrame(raf);
		};
		// Execute the animation if it is not already running
		if (!animations.cache[tag]) {
			raf();
		}
	};
}
