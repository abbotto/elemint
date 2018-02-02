/**
 * Compatibility Implementations
 * All items in this group are used to provide fallback/prefixed functionality
 * for browsers that do not fully support the features listed here
 */
var prefixes = ['webkit', 'Webkit', 'WebKit', 'moz', 'Moz', 'o', 'O', 'ms', 'Ms', 'MS', 'khtml', 'Khtml', ''];
var i = prefixes.length;

// Date.now() polyfill
if (!browser.DateNow) {
	Date.now = function dateNow() {
		return new Date().getTime();
	};
}
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
// CustomEvent polyfill for IE9 - IE10
if (!browser.CustomEvent) {
	(function (CustomEvent) {
		// Create the behaviour
		var createEvent = function (event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		};
		// Install the behaviour
		CustomEvent = window.CustomEvent.prototype;
		window.CustomEvent = createEvent;
	}(CustomEvent.prototype));
}
// Element.matches polyfill
if (!browser.matches) {
	(function (element) {
		// Create the behaviour
		var elementMatches = function (match) {
			match = (this.parentNode || this.document || this.ownerDocument).querySelectorAll(match);
			var i = -1;
			for (; match[++i] && match[i] != this;) {}
			return !!match[i];
		};
		// Prefix 'matchesSelector' if necessary
		while ((i--) > -1) {
			element.matchesSelector = element.matchesSelector || element[prefixes[i] + 'MatchesSelector'];
		}
		// Install the behaviour
		element.matches = element.matchesSelector || elementMatches;
	}(Element.prototype));
}
if (!browser.objectAssign) {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, 'assign', {
		value: function assign(target, varArgs) { // .length of function is 2
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}
