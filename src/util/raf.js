/**
 * @private
 * @description
 * Utility object for animations
 *
 * @return {Object}
 */

const raf = {
	callback: function rafCallback(tag, callback) {
		const raf = () => {
			// Run the animation
			callback();

			// Save a reference to the animation
			animations.job[tag] = requestAnimationFrame(raf);
		};

		// Execute the animation if it is not already running
		!animations.job[tag] && raf();
	}
};
