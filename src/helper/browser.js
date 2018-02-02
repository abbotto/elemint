/**
 * @private
 * @description
 * The included items are used to check for minimum browser requirements,
 * or to check for when a fallback is needed.
 *
 * @return {Boolean}
 */
var browser = {
	addEventListener: !!window.addEventListener,
	objectAssign: typeof Object.assign != 'function',
	objectKeys: !!Object.keys,
	querySelector: !!document.querySelector,
	bind: !!Function.prototype.bind,
	CustomEvent: true,
	requestAnimationFrame: !!window.requestAnimationFrame,
	matches: !!Element.prototype.matches,
	MutationObserver: !!window.MutationObserver,
	Uint8Array: !!window.Uint8Array,
	VBArray: !!window.VBArray,
	classList: !!document.documentElement.classList,
	insertAdjacentHTML: !!document.insertAdjacentHTML,
	DateNow: !!Date.now,
	unsupported: 'Sorry, your browser is unsupported. Please consider upgrading to the latest version.'
};

// Custom Event Constructor Test
try { new CustomEvent('SUPPORT__CustomEvent'); }
catch (e) { browser.CustomEvent = false; }

browser.supported = browser.querySelector
	&& browser.CustomEvent
	&& browser.objectKeys
	&& browser.bind
;
