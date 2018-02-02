/**
 * Compatibility Implementations
 * All items in this group are used to provide fallback/prefixed functionality
 * for browsers that do not fully support the features listed here
 */
var prefixes = ['webkit', 'Webkit', 'WebKit', 'moz', 'Moz', 'o', 'O', 'ms', 'Ms', 'MS', 'khtml', 'Khtml', ''];
var i = prefixes.length;

// Prefixed MutationObserver
if (!browser.MutationObserver) {
	while ((i--) > -1) {
		window.MutationObserver = window.MutationObserver || window[prefixes[i] + 'MutationObserver'];
	}
}

// Prefixed RequestAnimationFrame
if (!browser.requestAnimationFrame) {
	while ((i--) > -1) {
		window.requestAnimationFrame = window.requestAnimationFrame || window[prefixes[i] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window.cancelAnimationFrame || window[prefixes[i] + 'CancelAnimationFrame'] || window[prefixes[i] + 'CancelRequestAnimationFrame'];
	}
}

// Element.matches polyfill
if (!browser.matches) {
	(function (element) {
		// Create the behaviour
		var elementMatches = function (match) {
			match = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(match);
			var i = -1;
			for (; match[++i] && match[i] != this;) {}
			return match[i];
		};

		// Prefix 'matchesSelector' if necessary
		while ((i--) > -1) {
			element.matchesSelector = element.matchesSelector || element[prefixes[i] + 'MatchesSelector'];
		}

		element.matches = element.matchesSelector || elementMatches;
	}(Element.prototype));
}
