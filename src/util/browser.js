/**
 * @private
 * @description
 * Check for supported browser features
 *
 * @return {Boolean}
 */

// eslint-disable-next-line no-var
var supportedBrowser =
	Element.prototype.matches &&
	window.MutationObserver &&
	window.requestAnimationFrame;

// Cut the mustard test
if (!supportedBrowser) {
	throw new Error(
		'Your browser is unsupported - consider upgrading to the latest version.'
	);
}
