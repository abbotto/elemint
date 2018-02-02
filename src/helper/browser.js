/**
 * @private
 * @description
 * Check for supported browser features
 *
 * @return {Boolean}
 */
var browser = {
	addEventListener: window.addEventListener,
	objectKeys: Object.keys,
	querySelector: document.querySelector,
	requestAnimationFrame: window.requestAnimationFrame,
	matches: Element.prototype.matches,
	MutationObserver: window.MutationObserver,
	unsupported: 'Your browser is unsupported - consider upgrading to the latest version.'
};

browser.supported = browser.querySelector
	&& browser.objectKeys
	&& browser.addEventListener
;
