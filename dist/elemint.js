/**
 * Elemint
 * Description: Tricks for the DOM
 * Author: Jared Abbott
 * URL: https://github.com/abbotto/elemint/
 * Copyright 2018 Jared Abbott
 * Distributed under the MIT license
 * Version 0.1.0
 */
(function (name, context, factory) {
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	}
	else if (typeof define === 'function' && define.amd) {
		define(factory);
	}
	else {
		context[name] = factory();
	}
}('elemint', window || this, function () {
	var document = window.document;
	var noop = function () {};
	var wrapper = document.createElement('wrapper');

	var throwError = function throwError(msg) {
		throw new Error(msg);
	};

	// Caching
	var animations = {
		cache: {}
	};
	var events = {
		cache: {}
	};
	var queries = {
		cache: {}
	};
	var timers = {
		cache: {}
	};
// Regular expressions
var reCamelize = /(?:^|[-])(\w)/g,
	reClassMatch = /^\.([\w\-]+)$/,
	reClassType = /^\[object (.+)\]$/,
	reDotMatch = /\./g,
	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	reIdentifier = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
	reIdMatch = /^#([\w\-]+)$/,
	reTags = /<\/?!?([A-Za-z])[^>]*>/g,
	reTagMatch = /^([\w]+)$/,
	reTrimWs = /(^\s+|\s+$)/g,
	// http://www.w3.org/TR/css3-selectors/#whitespace
	reWhitespace = '[\\x20\\t\\r\\n\\f]';

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


	// Will this browser cut the mustard?
	if (browser.supported) {
/**
 * @private
 * @param {String}
 * @return {String}
 */
var toString = Function.prototype.call.bind(Object.prototype.toString);

/**
 * @private
 * @param {Nodelist}
 * @return {String}
 */
var toArray = Function.prototype.call.bind(Array.prototype.slice);

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

/**
 * @private
 * @param {Array} subject
 * @param {Function} callback
 * @return {Array} result
 */
function findMatch(subject, callback) {
	var result = [];
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	while (i--) callback(subject[i]) && result.push(subject[i]);
	return result;
}

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

/**
 * @private
 * @param {String}
 * @return {String}
 */
function camelize(string) {
	return string.replace(reCamelize, function (c) { (c ? c.toUpperCase() : ''); });
}

var eventList = [
	'DOMActivate',
	'DOMAttrModified',
	'DOMAttributeNameChanged',
	'DOMCharacterDataModified',
	'DOMContentLoaded',
	'DOMElementNameChanged',
	'DOMFocusInUnimplemented',
	'DOMFocusOutUnimplemented',
	'DOMNodeInserted',
	'DOMNodeInsertedIntoDocument',
	'DOMNodeRemoved',
	'DOMNodeRemovedFromDocument',
	'DOMSubtreeModified',
	'SVGAbort',
	'SVGError',
	'SVGLoad',
	'SVGResize',
	'SVGScroll',
	'SVGUnload',
	'SVGZoom',
	'abort',
	'afterprint',
	'animationend',
	'animationiteration',
	'animationstart',
	'audioprocess',
	'beforeprint',
	'beforeunload',
	'beginEvent',
	'blocked',
	'blur',
	'cached',
	'canplay',
	'canplaythrough',
	'change',
	'chargingchange',
	'chargingtimechange',
	'checking',
	'click',
	'close',
	'compassneedscalibrationUnimplemented',
	'complete',
	'complete',
	'compositionend',
	'compositionstart',
	'compositionupdate',
	'contextmenu',
	'copy',
	'cut',
	'dblclick',
	'devicelight',
	'devicemotion',
	'deviceorientation',
	'deviceproximity',
	'dischargingtimechange',
	'downloading',
	'drag',
	'dragend',
	'dragenter',
	'dragleave',
	'dragover',
	'dragstart',
	'drop',
	'durationchange',
	'emptied',
	'endEvent',
	'ended',
	'error',
	'focus',
	'focusinUnimplemented',
	'focusoutUnimplemented',
	'fullscreenchange',
	'fullscreenerror',
	'gamepadconnected',
	'gamepaddisconnected',
	'hashchange',
	'input',
	'invalid',
	'keydown',
	'keypress',
	'keyup',
	'languagechange',
	'levelchange',
	'load',
	'loadeddata',
	'loadedelemintdata',
	'loadend',
	'loadstart',
	'message',
	'mousedown',
	'mouseenter',
	'mouseleave',
	'mousemove',
	'mouseout',
	'mouseover',
	'mouseup',
	'noupdate',
	'obsolete',
	'offline',
	'online',
	'open',
	'orientationchange',
	'pagehide',
	'pageshow',
	'paste',
	'pause',
	'play',
	'playing',
	'pointerlockchange',
	'pointerlockerror',
	'popstate',
	'progress',
	'ratechange',
	'readystatechange',
	'repeatEvent',
	'reset',
	'resize',
	'scroll',
	'seeked',
	'seeking',
	'select',
	'show',
	'stalled',
	'storage',
	'submit',
	'success',
	'suspend',
	'timeout',
	'timeupdate',
	'touchcancel',
	'touchend',
	'touchenter',
	'touchleave',
	'touchmove',
	'touchstart',
	'transitionend',
	'unload',
	'updateready',
	'upgradeneeded',
	'userproximity',
	'versionchange',
	'visibilitychange',
	'volumechange',
	'waiting',
	'wheel'
];

/**
 * @private
 * @param {Array|Node}
 * @returns {Array}
 */
function flatten(arr) {
	var i = 0,
		len = arr.length,
		result = [],
		item;
	while (i < len) {
		item = (Array.isArray(arr[i])) ? flatten(arr[i]) : [arr[i]];
		[].push.apply(result, item);
		i += 1;
	}
	return result;
}

/**
 * @private
 * @description
 * Create precise timers for DOM actions.
 *
 * @param {Object} settings The settings that are used to configure each timer.
 * @returns {Function} callback The function that will be executed at each interval.
 *
 * @example
 * var settings = {
 *     tag: null,
 *     duration: 1000,
 *     cycle: 0,
 *     delay: 0,
 *     done: function(),{...}
 *     callback: function(),{...}
 *     cancel: false
 * };
 *
 * interval(settings);
 */
// Cache
var interval = function interval(settings) {
	var defaultSettings = {
		tag: null,
		duration: 1000,
		cycle: 0,
		delay: 0,
		done: noop(),
		callback: noop(),
		cancel: false
	};
	// Mark the function start time
	var startTime = Date.now();
	// Set the new parameters
	settings = merge(defaultSettings, settings);
	var tag = settings.tag;
	var duration = settings.duration;
	var cycle = settings.cycle;
	var done = settings.done;
	var callback = settings.callback;
	var delay = settings.delay;
	var cancel = settings.cancel;
	// Does a named timer exist?
	if (tag && duration === 0 && cycle === 0 && cancel === false) {
		return !!timers.cache[tag];
	}
	// Initialize the timer
	if (cancel === false && !timers.cache[tag]) {
		// Initial setup
		var interval = 0;
		var setDuration = duration;
		var elapsed = 0;
		var intervals = 0;
		var delta;
		var diff;
		// The timer
		var instance = function () {
			interval += 1;
			elapsed = Date.now() - startTime - intervals;
			if (interval * duration > Date.now() - startTime) {
				elapsed = interval * duration - intervals;
			}
			if (cycle !== 0 && interval === cycle && !!done) {
				return done();
			}
			// If we haven't passed the cycle threshold
			if ((interval <= cycle && cycle !== 0) || cycle === 0) {
				delta = elapsed - duration;
				// Call to action
				callback();
				// Update the duration
				setDuration = duration - delta;
				diff = Math.abs(setDuration - duration);
				intervals += elapsed;
				setDuration -= Math.round(diff);
				// Cache the timer if an id was provided
				(tag) ? timers.cache[tag] = window.setTimeout(instance, setDuration) : window.setTimeout(instance, setDuration);
			}
		};
		// Create a delay if one was requested
		(delay > 0) ? window.setTimeout(instance, delay) : instance();
	}
	// Cancel the timer
	else if (cancel === true && timers.cache[tag]) {
		clearTimeout(timers.cache[tag]);
		delete timers.cache[tag];
	}
};

/**
 * @private
 * @param {Array|Element} subject
 * @return {Function} callback
 */
function loop(subject, callback) {
	var i = 0;
	var len = subject.length;
	(len > 0) || (subject = [subject], len = 1);

	for (; i < len; i += 1) {
		return callback(subject[i], i);
	}
}

/**
 * @private
 * @description
 * - Deep and shallow merges.
 * - Return a new object, preserving all of the original objects and their properties.
 *
 * @param {Objects|Boolean} arguments
 * - The objects to merge together.
 * - Set the first argument to `true` for a deep merge.
 * @returns {Object} A new object consisting of all the other objects properties.
 *
 * @example
 * // Merge
 * merge(object1, object2, ...);
 *
 * // Deep merge
 * merge(true, object1, object2, ...);
 */
var merge = function merge(objects) {
	// Set some vars
	var args = toArray(arguments);
	var deep = false;
	var key;

	if (typeof args[0] === 'boolean') {
		deep = args.shift();
	}

	var copy = {};
	var len = args.length;
	var i = 0;

	for (; i < len; i += 1) {
		if (!args[i]) {
			continue;
		}

		var keys = Object.keys(args[i]);
		var n = keys.length;

		while (n--) {
			// Deep
			// If a key has another object as its value,
			// the destination object's properties will
			// be mixed in with the source object properties
			// and returned in a new object
			if (deep === true && toString(args[i][key]) === '[object Object]') {
				merge(true, copy[keys[n]], args[i][keys[n]]);
			}
			// Shallow
			// If a key has another object as its value,
			// the destination object's properties will
			// be overridden by the source object properties
			// and returned in a new object
			else copy[keys[n]] = args[i][keys[n]];
		}
	}
	return copy;
};

/**
 * @private
 * @description
 * Reset the list of cached elements when elements are added/removed to/from the DOM
 */
function nodeCache() {
	if (browser.MutationObserver) {
		// Create an observer instance
		var mutate = new window.MutationObserver((function (e) {
			// Normalize the event
			e = e || window.event;
			e.some(function (mutation) {
				// Prevent double-fire
				if (Object.keys(queries.cache).length !== 0) {
					queries.cache = {};
				}
				return e;
			});
		}));
		// Configuration of the observer
		var config = {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true
		};
		// Pass in the target node, as well as the observer options
		mutate.observe(document, config);
	}
	else {
		['DOMNodeInserted', 'DOMNodeRemoved'].forEach(function (evt) {
			document.addEventListener(evt, function (e) {
				var keys = Object.keys(queries.cache);
				// Prevent double-fire
				if (keys.length !== 0) {
					queries.cache = {};
				}
				return e;
			}, 0);
		});
	}
}
// Reset the cache when DOM nodes are are inserted or removed
nodeCache();

/**
 * @private
 * @description
 * Test if an item is of the correct node type
 * to be supported
 *
 * @param {Array|Element}
 * @returns {Boolean}
 */
function nodeTest(node) {
	return !!((node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11));
}

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

/**
 * $.style preflight
 */
var $tyles;
var $tyle = {};
$tyle.context = document;
$tyle.element = $tyles = document.createElement('style');
$tyle.element.appendChild($tyle.context.createTextNode(''));
$tyle.sheet = document.head.appendChild($tyles).sheet;


/**
 * @private
 * @param {Document|Element}
 */
function styleDocument(doc) {
	var d = doc || document;
	$tyle.context = d;
	$tyle.element = (!doc) ? $tyles : d.createElement('style');
	if (doc) {
		$tyle.element.appendChild(d.createTextNode(''));
	}
	$tyle.sheet = (!doc) ? $tyles.sheet : d.head.appendChild($tyle.element).sheet;
}

/**
 * @private
 * @param {Array|Element}
 * @param {String}
 * @return {String}
 */
function getStyleValue(subject, css) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	while (i--) {
		if (subject[i].currentStyle) {
			return subject[i].currentStyle[camelize(css)];
		}
		else if ($tyle.context.defaultView && $tyle.context.defaultView.getComputedStyle) {
			return $tyle.context.defaultView.getComputedStyle(subject[i], null).getPropertyValue(css);
		}

		return subject[i].style[camelize(css)];
	}
}

/**
 * @private
 * @description
 * Test if an item is of the type 'window'
 *
 * @param {Object}
 * @returns {Boolean}
 */
function windowTest(obj) {
	return (typeof (window.constructor) === 'undefined') ? obj instanceof window.constructor : obj.window === obj;
}

/**
 * @private
 * @description
 * Return a copy of the elemint chainable stack
 *
 * @param {Object}
 * @returns {Object}
 */
function stack(result) {
	// Reset `$$.fn.selector` if a selector is passed in
	if (result) {
		$$.fn.selector = $$.fn.$ = result;
	}

	return {
		constructor: $$.fn.constructor,
		context: $$.fn.context,
		selector: $$.fn.selector,
		$: $$.fn.$,
		after: function () {
			return stack(after(this.$));
		},
		ascend: function (selector) {
			return stack(ascend(this.$, selector));
		},
		before: function () {
			return stack(before(this.$));
		},
		inner: function () {
			return stack(inner(this.$));
		},
		class: {
			on: function (classList) {
				classes(this.$).on(classList);
				return this;
			},
			off: function (classList) {
				classes(this.$).off(classList);
				return this;
			},
			sub: function (classA, classB) {
				classes(this.$).sub(classA, classB);
				return this;
			}
		},
		descend: function (selector) {
			selector = selector || null;
			var result = descend(this.$, selector);
			return stack(result);
		},
		event: {
			set: function (config) {
				event(this.$).set(config);
				return this;
			},
			kill: function (eventId, callback) {
				event(this.$).kill(eventId, callback);
				return this;
			},
			emit: function (eventName, config) {
				event(this.$).emit(eventName, config);
				return this;
			}
		},
		insert: function (position, content) {
			insert(this.$, position, content);
			return this;
		},
		layer: function (index) {
			var layer = layer(this.$, index);
			if (typeof index !== 'number') {
				return layer;
			}
			return this;
		},
		match: function (selector, callback) {
			var result = match(this.$, selector, callback);
			return stack(result);
		},
		offset: {
			set: function (config) {
				offset(this.$).set(config);
				return this;
			},
			get: function () {
				return offset(this.$).get();
			}
		},
		parent: function () {
			return stack(parent(this.$));
		},
		position: function () {
			return position(this.$[0]);
		},
		prop: {
			set: function (prp, value) {
				prop(this.$).set(prp, value);
				return this;
			},
			get: function (prp) {
				return prop(this.$).get(prp);
			},
			kill: function (prp) {
				prop(this.$).kill(prp);
				return this;
			}
		},
		remove: function (position) {
			remove(this.$, position);
			return this;
		},
		reset: function (node, opt) {
			reset(this.$, node, opt);
			return this;
		},
		sibling: function (selector) {
			var result = sibling(this.$, selector);
			result = (result.length > 1) ? result.reverse() : [result];
			return stack(result);
		},
		size: {
			set: function (config) {
				size(this.$).set(config);
				return this;
			},
			get: function () {
				return size(this.$).get();
			}
		},
		style: {
			set: function (subject, value, doc) {
				if (value && value.nodeType) doc = value;
				style(this.$, doc).set(subject, value);
				return this;
			},
			get: function (styleName) {
				return style(this.$).get(styleName);
			}
		}
	};
}

/**
 * @memberof $
 * @method $.after
 *
 * @description
 * Return the immediately following sibling OR next matched sibling of each element in the set of matched elements.
 *
 * @param {Array|Element} subject The element(s) whose next sibling will be obtained.
 * @param {String} selector Return the next sibling that matches the given selector.
 * @returns {Array|Element} Element collection.
 *
 * @example
 * $.after(elements);
 * $(selector).after(optionalSelector);
 */
var after = function after(subject, selector) {
	var sib;
	var result = [];
	var i = 0;
	var len = subject.length;
	(len > 0) || (subject = [subject], len = 1);

	if (!!selector && !!selector.substring) {
		while (subject[i]) {
			subject[i + 1] = subject[i].nextElementSibling;

			if (subject[i + 1] && subject[i + 1].matches(selector)) {
				result.push(subject[i + 1]);
				break;
			}

			i += 1;
		}
	}
	else {
		while (subject[i]) {
			result.push(subject[i].nextElementSibling);
			i += 1;
		}
	}

	// Update the values we need to be returned in stack()
	return result;
};

/**
 * @memberof $
 * @method $.animate
 *
 * @description
 * Manage DOM animations.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill' methods.
 *
 * @example
 * $.animate;
 */
var animate = {
	/**
	 * @memberof $
	 * @method animate/set
	 *
	 * @description
	 * Configure and start a DOM animation.
	 *
	 * @param {Object} config Animation configuration.
	 *
	 * @example
	 * var config = {
	 *     tag: 'myAnimation',
	 *     callback: function(){...}
	 * };
	 *
	 * $.animate.set(config);
	 */
	set: function animateSet(config) {
		var defaultSettings = {
			tag: null,
			callback: noop()
		};

		// Set the new params
		config = merge(defaultSettings, config);
		var tag = config.tag;
		var callback = config.callback;
		var cancel = config.cancel;

		if (tag && !callback) {
			return !!animations.cache[name];
		}
		else if (tag && callback) RAF.callback(tag, callback);
	},
	/**
	 * @memberof $
	 * @method animate/kill
	 *
	 * @description
	 * Kill a DOM animation.
	 *
	 * @param {string} tag Animation identification.
	 *
	 * @example
	 * $.animate.kill(tag);
	 *
	 */
	kill: CAF
};

/**
 * @memberof $
 * @method $.ascend
 *
 * @description
 * Return the ancestors of the matched elements.
 *
 * @param {Element|Array} subject The element(s) whose ancestors will be returned.
 * @param {String} selector Narrow the search result by selector.
 * @param {Number} limit Limit how many ancestors will be returned.
 * @returns {Array|Object} Array containing the matched ancestors.
 *
 * @example
 * $.ascend(element, selector, limit);
 * $(element).ascend(selector, limit);
 */
var ascend = function ascend(subject, selector, limit) {
	var result = [];
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);
	n = limit ? 1 : 0;
	limit = limit || i;

	// Get all ancestors
	if (!selector) {
		while (i-- && i > -1) {
			while (subject[i].parentElement && n <= limit) {
				subject[i] = subject[i].parentElement;
				result.unshift(subject[i]);
				n = (n !== 0) ? n + 1 : n;
			}
		}
	}
	// Get specific ancestor(s)
	else {
		while (i-- && i > -1) {
			while (subject[i].parentElement && n <= limit) {
				subject[i] = subject[i].parentElement;
				if (subject[i].matches(selector)) {
					result.unshift(subject[i]);
				}
				n = (n !== 0) ? n + 1 : n;
			}
		}
	}

	return result;
};

/**
 * @memberof $
 * @method $.before
 *
 * @description
 * Return the immediately preceding sibling OR preceding matched sibling of each element in the set of matched elements.
 *
 * @param {Array|Element} subject The element(s) whose preceding sibling will be obtained.
 * @param {String} selector Return a preceding sibling that matches the given selector.
 * @returns {Array|Element} Element collection.
 *
 * @example
 * $.before(elements);
 * $(selector).before(optionalSelector);
 */
var before = function before(subject, selector) {
	var sib,
		result = [];
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	if (!!selector && !!selector.substring) {
		while (subject[i - 1]) {
			subject[i - 2] = subject[i - 1].previousElementSibling;

			if (subject[i - 2].matches(selector)) {
				result.push(subject[i - 2]);
				break;
			}

			i--;
		}
	}
	else while (i--) result.push(subject[i].previousElementSibling);

	// Update the values we need to be returned in stack()
	return result;
};

/**
 * @memberof $
 * @method $.child
 *
 * @description
 * Return the immediate children of the matched elements.
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} selector Find a specific subset of children.
 * @returns {Array} A collection of the selected element's children.
 *
 * @example
 * $.child(element);
 * $.child(element, selector);
 *
 * $(selector).child();
 * $(selector).child(selector);
 */
var child = function child(subject, selector) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var result = [];
	var children;
	var n;

	if (selector) {
		while (i--) {
			children = subject[i].children;
			n = children.length;

			while (n--) children[n].matches(selector) && result.unshift(children[n]);
		}
	}
	else {
		while (i--) {
			children = subject[i].childNodes;
			n = children.length;

			while (n--) result.unshift(children[n]);
		}
	}

	return result;
};

/**
 * @description
 * Manipulate element classes
 *
 * @memberof $
 * @method $.class
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill, sub, test' methods.
 *
 * @example
 * $.class(element);
 */
var classes = function classes(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	return {
		/**
		 * @description
		 * Enable a class on an element's `className` property.
		 *
		 * @memberof $
		 * @method class/set
		 *
		 * @param {String} classes The classnames to be enabled.
		 *
		 * @example
		 * $.class(element).set(classA, classB, classN, ...);
		 * $(selector).class.set(classA, classB, classN, ...);
		 */
		set: function classSet() {
			var n;
			var cNames;
			var names = toArray(arguments);
			var namesLen = names.length;

			while (i--) {
				if (!subject[i].className) subject[i].className = names.join(' ');
				else {
					cNames = subject[i].className
						? subject[i].className.split(' ')
						: []
					;

					n = namesLen;
					while (n-- && cNames.indexOf(names[n]) < 1) cNames.push(names[n]);
					subject[i].className = cNames.join(' ');
				}
			}
		},
		/**
		 * @description
		 * Disable a class on an element's `className` property.
		 *
		 * @memberof $
		 * @method class/kill
		 *
		 * @param {String} classes The classnames to be disabled.
		 *
		 * @example
		 * $.class(element).kill(classA, classB, classN, ...);
		 * $(selector).class.kill(classA, classB, classN, ...);
		 */
		kill: function classKill() {
			var n;
			var index;
			var cNames;
			var names = toArray(arguments);
			var namesLen = names.length;

			while (i--) {
				if (subject[i].className) {
					n = namesLen;
					cNames = subject[i].className.split(' ');

					while (n--) {
						index = cNames.indexOf(names[n]);
						index > -1 && cNames.splice(index, 1);
					}

					subject[i].className = cNames.join(' ');
				}
			}
		},
		/**
		 * @description
		 * Substitute a class on an element's `className` property with another class.
		 *
		 * @memberof $
		 * @method class/sub
		 *
		 * @param {String} target The class that will be replaced.
		 * @param {String} replacement The class that will replace the target class.
		 *
		 * @example
		 * $.class(element).sub('classA', 'classB');
		 * $(selector).class.sub('classA', 'classB');
		 */
		sub: function classSub(classA, classB) {
			var n;
			var index;
			var cNames;

			while (i--) {
				cNames = subject[i].className
					? subject[i].className.split(' ')
					: []
				;

				if (cNames.length) {
					index = cNames.indexOf(classA);
					index > -1 && (cNames[index] = classB);
				}
				else cNames.push(classA);

				subject[i].className = cNames.join(' ');
			}
		},
		/**
		 * @description
		 * Check if a class exists on an element's `className` property.
		 *
		 * @memberof $
		 * @method class/test
		 *
		 * @param {String} target The class that will be tested.
		 * @return {Boolean}
		 *
		 * @example
		 * $.class(element).test('className');
		 * $(selector).class.test('className');
		 */
		test: function classTest(className) {
			return subject[0].className.indexOf(className) > -1;
		}
	};
};

/**
 * @memberof $
 * @method $.descend
 *
 * @description
 * Find all matched descendant elements within the parent element(s).
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} selector The target ancestors.
 * @returns {Array} Ancestors that match the selector.
 *
 * @example
 * $.descend(element, selector);
 */
var descend = function descend(subject, selector) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var result = query(selector, subject[i]);
	i--;

	while (i--) result.concat(query(selector, subject[i]));

	return result;
};

/**
 * @description
 * Manage element events
 *
 * @memberof $
 * @method $.event
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill, emit' methods.
 *
 * @example
 * $.event(element);
 */
var event = function event(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var methods = {
		/**
		 * @description
		 * Setup an event listener on an element
		 *
		 * @memberof $
		 * @method event/set
		 *
		 * @param {Array|Element} subject The target element(s)
		 * @param {Object} config Event listener configuration
		 *
		 * @example
		 * var config = {
		 *     on: '',
		 *     tag: '',
		 *     target: false,
		 *     callback: function(){...},
		 *     limit: false
		 * }
		 *
		 * $.event(element).set(evt, callback);
		 * $.event(element).set(config);
		 * $(selector).event.set(config);
		 */
		set: function eventSet(config, cb) {
			// Advanced configuration
			if (!config.substring) {
				var tag = config.tag;
				var callback = config.callback;
				evt = config.on;

				var eventsForMobile = {
					touchstart: ('ontouchstart' in window) ? 'touchstart' : 'mousedown',
					touchend: ('ontouchend' in window) ? 'touchend' : 'mouseup',
					touchmove: ('ontouchmove' in window) ? 'touchmove' : 'mousemove',
					touchcancel: ('ontouchcancel' in window) ? 'touchcancel' : 'mouseout',
					mousedown: ('onmousedown' in window) ? 'mousedown' : 'touchstart',
					mouseup: ('onmouseup' in window) ? 'mouseup' : 'touchend',
					mousemove: ('onmousemove' in window) ? 'mousemove' : 'touchmove',
					mouseout: ('onmouseout' in window) ? 'mouseout' : 'touchcancel'
				};

				config = merge({
					tag: '',
					on: '',
					target: false,
					callback: noop(),
					limit: false
				}, config);

				// Event fallbacks for touch vs mouse
				if (eventsForMobile[evt]) evt = eventsForMobile[evt];

				// Save the event
				if (tag && !events.cache[tag] && callback) events.cache[tag] = config;

				var eventAction = function eventAction(e) {
					if (!events.cache[tag]) return false;

					// Normalize the event
					e = e || window.event;
					e.source = e.source || e.srcElement;

					var source = e.target || e.source;
					var newTarget = events.cache[tag].target;
					var callback = events.cache[tag].callback;

					// Basic event handler
					if (!newTarget) {
						// One-time events
						if (events.cache[tag].limit === true) {
							this.removeEventListener(e.type, eventAction, 0);
							if (events.cache[tag]) delete events.cache[tag];
						}
						callback.call(this, e);
					}
					else if (newTarget) {
						// Event delegation
						var delegatee = toArray(this.querySelectorAll(newTarget));
						var n = delegatee.length;

						while (i--) {
							if (source === delegatee[n]) {
								// One-time event
								if (limit === true) {
									this.removeEventListener(e.type, eventAction, 0);
									if (events.cache[tag]) delete events.cache[tag];
								}
								callback.call(e.source, e);
							}
						}
					}
				};

				// Uses a named function that can be referenced for canceling one-time events
				while (i--) subject[i].addEventListener(evt, eventAction, 0);
			}
			// Map directly to `addEventListener`
			else {
				while (i--) subject[i].addEventListener(config, cb.bind(subject[i]), 0);
			}
		},
		/**
		 * @description
		 * Stop an event listener
		 *
		 * @memberof $
		 * @method event/kill
		 *
		 * @param {Array} tagOrEventName A tag or event name for an existing event
		 * @param {Array} callback The original callback function to be used with an event name
		 *
		 * @example
		 * $.event(element).kill('tag');
		 * $.event(element).kill('eventName', callback);
		 *
		 * $(selector).event.kill('tag');
		 * $(selector).event.kill('eventName', callback);
		 */
		kill: function eventKill(tagOrEventName, callback) {
			var cancelFn = events.cache[tagOrEventName].callback || callback;

			var evt = callback
				? tagOrEventName
				: events.cache[tagOrEventName].on
			;

			while (i--) {
				subject[i].removeEventListener(evt, cancelFn.bind(subject[i]), 0);
			}

			if (events.cache[tagOrEventName]) delete events.cache[tagOrEventName];
		},
		/**
		 * @description
		 * Send an event to an element
		 *
		 * @memberof $
		 * @method event/emit
		 *
		 * @param {Object} eventName The name of the event
		 * @param {Object} config The config for the event
		 *
		 * @example
		 * var config = {
		 *     bubbles    : true,
		 *     cancelable : true
		 * }
		 *
		 * $.event(element).emit('eventName', config);
		 * $(selector).event.emit('eventName', config);
		 */
		emit: function eventEmit(eventName, config) {
			if (this.substring) {
				config = eventName;
				eventName = this;
			}

			var event;

			if (!config) {
				config = {
					bubbles: true,
					cancelable: true
				};
			}

			if (eventList.indexOf(eventName) < 0) {
				if (window.CustomEvent) {
					event = new CustomEvent(eventName, config);
				}
				else if (document.createEvent) {
					document.createEvent('CustomEvent');
					event.initCustomEvent(eventName, true, true, config);
				}
			}
			else if (typeof Event === 'function') {
				event = new Event(eventName);
			}
			else if (document.createEvent) {
				document.createEvent('HTMLEvents');
				event.initEvent(eventName, true, true);
			}
			else {
				event = document.createEventObject();
				event.eventType = eventName;
			}

			event.eventName = eventName;

			if (document.createEvent) while (i--) subject[i].dispatchEvent(event);
			else subject[i].fireEvent('on' + event.eventType, event);
		}
	};

	// Shorthand 'emit' methods for events found here:
	// https://developer.mozilla.org/en-US/docs/Web/Events
	var n = eventList.length;
	while (n--) methods[eventList[n]] = methods.emit.bind(eventList[n]);

	return methods;
};

/**
 * @memberof $
 * @method $.fragment
 *
 * @description
 * Wrap HTML/nodes in a document fragment.
 *
 * @param {String|Element|Array} contents The html/elements that will be wrapped.
 * @returns {DocumentFragment} The html/elements wrapper.
 *
 * @example
 * $.fragment([el1, el2, el3, ...]);
 * $.fragment("<div>...</div>");
 */
var fragment = function fragment(subject) {
	var frag = document.createDocumentFragment();

	if (subject.substring) {
		wrapper.innerHTML = subject;
		while (firstChild = wrapper.firstChild) frag.appendChild(firstChild);
	}
	else {
		var i = subject.length;
		(i > 0) || (subject = [subject], i = 1);
		var n = 0;
		for (; n < i; n += 1) frag.appendChild(subject[n]);
	}

	return frag;
};

/**
 * @memberof $
 * @method $.insert
 *
 * @description
 * Insert html/nodes into the DOM:
 * - innerEnd: `afterend` of subject's last child.
 * - innerBegin: `beforebegin` of subject's first child.
 * - outerEnd: `afterend` of subject's last sibling.
 * - outerBegin: `beforebegin` of subject's first sibling.
 * - before: `beforebegin` of subject.
 * - after: `afterend` of subject.
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} position The position of the new node(s).
 * @param {Element|DocumentFragment|String} node The node(s) that will be inserted.
 *
 * @example
 * $.insert(subject, position, content);
 */
var insert = function insert(subject, position, content) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	var locationTags = [
		'after',
		'before',
		'innerBegin',
		'innerEnd',
		'outerBegin',
		'outerEnd'
	];

	var node;
	var frag;
	var parent;

	if (locationTags.indexOf(position) < 0) {
		content = position;
		position = false;
	}

	if (content.substring) {
		frag = document.createDocumentFragment();
		wrapper.innerHTML = content;
		while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
		content = frag;
	}

	if (!position) {
		while (i--) {
			while (subject[i].lastChild) subject[i].removeChild(subject[i].lastChild);
			subject[i].appendChild(content);
		}
	}
	else {
		while (i--) {
			parent = subject[i].parentNode || document.documentElement;

			/* eslint-disable indent */
			// `afterend` of subject's lastChild
			position === 'innerEnd'
				? subject[i].appendChild(content)
			// `beforebegin` of subject's firstChild
			: position === 'innerBegin'
				? subject[i].insertBefore(content, subject[i].firstChild)
			// `afterend` of subject's lastSibling
			: position === 'outerEnd'
				? parent.appendChild(content)
			// `beforebegin` of subject's firstSibling
			: position === 'outerBegin'
				? parent.insertBefore(content, parent.firstChild)
			// `beforebegin` of subject
			: position === 'before'
				? parent.insertBefore(content, subject[i])
			// `afterend` of subject
			: position === 'after'
				? parent.insertBefore(content, subject[i].nextElementSibling)
				: throwError('Unknown position')
			;
		}
	}
};

/**
 * @memberof $
 * @method $.layer
 *
 * @description
 * Manage element layers.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.layer(element);
 */
var layer = function (subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	if (subject[0].nodeType === 1) {
		return {
			/**
			 * @memberof $
			 * @method layer/set
			 *
			 * @description
			 * Set the z-index of an element.
			 *
			 * @param {Number} z-index The new z-index for the element(s).
			 *
			 * @example
			 * $.layer(elements).set(newIndex);
			 * $(selector).layer.set(newIndex)
			 */
			set: function (newIndex) {
				while (i--) subject[i].style['z-index'] = newIndex;
			},
			/**
			 * @memberof $
			 * @method layer/get
			 *
			 * @description
			 * Return the z-index of an element.
			 *
			 * @returns {Number} The z-index of the element.
			 *
			 * @example
			 * $.layer(elements).get(newIndex);
			 * $(selector).layer.get(newIndex)
			 */
			get: function () {
				// Return the current z-index for the first item in the set
				var zIndex = subject[0].style['z-index'] || window
					.document
					.defaultView
					.getComputedStyle(subject[0])
					.getPropertyValue('z-index')
				;

				return parseInt(zIndex, 10);
			}
		};
	}

	throw Error('Not an element');
};

/**
 * @memberof $
 * @method $.match
 *
 * @description
 * Return a set of elements that match the selector or pass the test.
 *
 * @param {Array|Element} subject The set of elements.
 * @param {String} selector A query selector.
 * @param {Function} callback A callback function used to find a match.
 *
 * @example
 * $.match(element, selector, callback);
 */
var match = function match(subject, selector, callback) {
	/* eslint-disable indent */
	return selector.substring && typeof callback === 'function'
			? findMatch(subject, function (el) {
				if (el.matches(selector)) return callback(el);
			})
		: selector.substring
			? findMatch(subject, function (el) { return el.matches(selector); })
		: typeof selector === 'function'
			&& findMatch(subject, function (el) { return selector(el); })
	;
};

/**
 * @memberof $
 * @method $.mount
 *
 * @description
 * - Mount an element's children or a fragment into the DOM.
 * - Clears both the element or fragment and the mountpoint before mounting the nodes.
 * - If the `preserve` boolean is passed, the mountpoint won't be cleared.
 *
 * @param {Element} destination A new container that will hold the new nodes.
 * @param {Element|Fragment} source An existing container whose elements will be mounted.
 * @param {Boolean} preserve Keep any existing nodes in the destination and append new nodes.
 * @return {Element} mountpoint The element containing the new nodes.
 *
 * @example
 * $.mount(destination, source);
 */
var mount = function mount(dest, src, preserve) {
	if (!preserve) while (dest.lastChild) dest.removeChild(dest.lastChild);
	if (src.nodeType === 11) dest.appendChild(src);
	else while (src.firstChild) dest.appendChild(src.firstChild);
	return dest;
};

/**
 * @memberof $
 * @method $.offset
 *
 * @description
 * Manage element offsets.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.offset(element);
 */
var offset = function offset(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	return {
		/**
		 * @memberof $
		 * @method offset/set
		 *
		 * @description
		 * Set the offset of an element relative to the document.
		 *
		 * @param {Object} settings The new offset of the element(s).
		 *
		 * @example
		 * $.offset(elements).set({top: ..., left: ...});
		 * $(selector).offset.set({top: ..., left: ...});
		 */
		set: function (value) {
			while (i--) {
				if (value.top || value.left) subject[i].style.position = 'fixed';
				if (value.top) subject[i].style.top = value.top + 'px';
				if (value.left) subject[i].style.left = value.left + 'px';
			}
		},
		/**
		 * @memberof $
		 * @method offset/get
		 *
		 * @description
		 * Return the offset of an element relative to the document.
		 *
		 * @returns {Object} An object containing the element(s) offset as it's properties.
		 *
		 * @example
		 * $.offset(elements).get();
		 * $(selector).offset.get();
		 */
		get: function () {
			var rectangle = subject[0].getBoundingClientRect();
			return {
				top: rectangle.top + document.body.scrollTop,
				left: rectangle.left + document.body.scrollLeft
			};
		}
	};
};

/**
 * @memberof $
 * @method $.parent
 *
 * @description
 * Return the parent of the matched elements.
 *
 * @param {Array|Element} subject The element whose parent will be selected.
 * @returns {Array} The parent element.
 *
 * @example
 * $.parent(elements);
 * $(selector).parent();
 */
var parent = function parent(elements) {
	var result = [];
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);
	while (i--) {
		// Define the element
		result.push(elements[i].parentNode);
	}
	return result;
};

/**
 * @memberof $
 * @method $.position
 *
 * @description
 * Return the position of an element relative to it's offset parent.
 *
 * @param {Element} subject The element whose position will be returned.
 * @returns {Object} The position of the element returned within an object.
 *
 * @example
 * $.position(element);
 * $(selector.position();
 */
var position = function position(subject) {
	return {
		x: subject.offsetLeft,
		y: subject.offsetTop,
		z: layer(subject).get()
	};
};

/**
 * @memberof $
 * @method $.print
 *
 * @description
 * - When window.print() is called, the original document can be printed by the browser.
 * - In order to print custom HTML instead of the whole document, HTML will be injected into an Iframe.
 * - When iframe.print() is called, the injected HTML can be printed by the browser.
 * - HTML can also be injected into the iframe document and applied to the injected HTML.
 *
 * @param {String} config.template A HTML string or DOM node that will printed.
 * @param {Array} config.script URLs for scripts.
 * @param {Array} config.style URLs for stylesheets.
 * @param {Object|Boolean} config.copy Set to `true` to use all stylesheets and scripts from the original document.
 * @param {Boolean} config.copy.style Copy all the styles from the original document to the print document.
 * @param {Boolean} config.copy.script Copy all the scripts from the original document to the print document.
 *
 * @example
 * $.print({
 *     template: {
 * 		   html: "<div>Hello world!</div>"
 *     },
 *     copy: true
 * });
 */
var print = function print(config) {
	var template = config.template.nodeType === 1
		? config.template.outerHTML
		: config.template.substring
			? config.template
			: null
	;

	var styles = config.style || [];
	var scripts = config.script || [];
	var assets = styles.concat(scripts);
	var test = config.test;
	var copy = config.copy || {};
	var document = window.document;

	var job = {
		styles: 0,
		scripts: 0,
		template: false,
		print: true
	};

	// Print when ready
	return (function printReady(printingTemplate) {
		// Build the iframe
		var frameName = ('elemint-print-' + Date.now());
		var iFrame = '<iframe style="width:1px; height: 1px; position: absolute; left: -9999px" id="' + frameName + '" name="' + frameName + '">';
		document.body.insertAdjacentHTML('afterBegin', iFrame);

		// Insert a document into the current iframe
		var frameElement = document.getElementById(frameName);
		var frame = window.frames[frameName];
		var frameDocument = frame.document;
		var styleFragment = document.createDocumentFragment();
		var scriptFragment = document.createDocumentFragment();
		var frameHTML = '<!DOCTYPE html><html><head></head><body>';
		frameHTML += printingTemplate;
		frameHTML += '</body></html>';
		frameDocument.open();
		frameDocument.write(frameHTML);
		frameDocument.close();

		// Copy assets from the original document
		if (copy === true || copy.style === true) {
			// Grab all the linked and embedded assets on the parent document
			var css = document.querySelectorAll('link, style');
			styleFragment = scrapePrintAssets(css, styleFragment);
		}
		if (copy === true || copy.script === true) {
			// Grab all the linked and embedded assets on the parent document
			var js = document.querySelectorAll('script');
			scriptFragment = scrapePrintAssets(js, scriptFragment);
		}

		// Asset handler
		if (Array.isArray(assets)) {
			var link,
				script;

			var i = 0;
			var len = assets ? assets.length : 0;
			for (; i < len; i++) {
				var ext = assets[i].substr(assets[i].lastIndexOf('.') + 1);

				if (ext === 'css') {
					styleFragment = injectPrintLink(styleFragment, assets[i]);
				}
				else if (ext === 'js') {
					scriptFragment = injectPrintScript(scriptFragment, assets[i]);
				}
			}
		}

		// Job output
		job.styles = styleFragment.children ? styleFragment.children.length : 0;
		job.scripts = scriptFragment.children ? scriptFragment.children.length : 0;
		job.template = printingTemplate;

		if (!frame.print) job.print = false;

		// Execute the print job
		function printJob() {
			// In IE, you have to focus() the IFrame prior to printing
			// or else the top-level page will print instead
			if (!test) frame.focus();
			if (!test) frame.print();
			return finalizePrintJob(job, frameName, frameElement);
		}

		// Append assets to the head
		var head = frameDocument.getElementsByTagName('head')[0];
		head.appendChild(styleFragment);
		head.appendChild(scriptFragment);

		// Get the last appended asset
		var lastChild = head.lastChild;
		if (!lastChild || !!test) return printJob();

		var timeout = true,
			count = 0;

		// The load event is fired when a resource
		// and its dependent resources have finished loading
		// * FF and IE browsers wouldn't work without calling setInterval
		lastChild.addEventListener('load', function (event) {
			timeout = false;
		}, 0);

		var interval = setInterval(function () {
			if (!timeout) {
				clearInterval(interval);
				return printJob();
			}
			// Fail after trying for 5 seconds
			else if (count === 20) {
				clearInterval(interval);
				throwError('Print job timed out after 20 seconds.');
			}

			count += 1;
		}, 250);
	}(template));
};

function finalizePrintJob(job, frameName, frameElement) {
	// Clear the IFrame
	delete window.frames[frameName];
	document.body.removeChild(frameElement);
	return job;
}

function scrapePrintAssets(arr, fragment) {
	var clone;
	var k = 0;
	var len = arr ? arr.length : 0;
	for (; k < len; k++) {
		// Deep clone the original style element
		clone = arr[k].cloneNode(true);
		fragment.appendChild(clone);
	}
	return fragment;
}

function injectPrintScript(fragment, asset) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = false;
	script.src = asset;
	fragment.appendChild(script);
	return fragment;
}

function injectPrintLink(fragment, asset) {
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = asset;
	fragment.appendChild(link);
	return fragment;
}

/**
 * @memberof $
 * @method $.prop
 *
 * @description
 * Manage element properties (attributes)
 *
 * @param {Array|Element} subject The target element(s)
 * @return {Object} props An object containing the 'set, get, kill' methods
 *
 * @example
 * $.prop(element);
 */
var prop = function (subject) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	return {
		/**
		 * @description
		 * Set a value on an element property (attribute).
		 *
		 * @memberof $
		 * @method prop/set
		 *
		 * @param {Array} prop The property whose value will be set.
		 * @param {Array} value The value that will be set to the property.
		 *
		 * @example
		 * $.prop(element).set('propName', 'value');
		 * $(selector).prop.set('propName', 'value');
		 */
		set: function propSet(prp, value) {
			var key;

			// Single attribute
			if (typeof value !== 'undefined' && !!prp.substring) {
				while (i--) {
					// Always use removeAttribute instead of setting the attribute value to null using setAttribute.
					(value.substring()) ? subject[i].setAttribute(prp, value) : subject[i].removeAttribute(prp);
				}
			}
			// Loop through attribute array object containing multiple attributes
			else if (toString(prp) === '[object Object]') {
				while (i--) {
					for (key in prp) {
						if (prp.hasOwnProperty(key)) {
							// Always use removeAttribute instead of setting the attribute value to null using setAttribute.
							(prp[key].substring()) ? subject[i].setAttribute(key, prp[key]) : subject[i].removeAttribute(key);
						}
					}
				}
			}
		},

		/**
		 * @description
		 * Get a value from an element property (attribute).
		 *
		 * @memberof $
		 * @method prop/get
		 *
		 * @param {String} prop The property or properties whose value(s) will be fetched.
		 *
		 * @example
		 * $.prop(element).get('property');
		 * $(selector).prop.get('property');
		 */
		get: function propGet() {
			var prp = toArray(arguments);

			// Pass an array of attributes and return the values in an object for the first matched item
			if (prp.length === 1) return subject[0].getAttribute(prp[0]);
			var values = {};
			var n = 0;
			i += 1;

			for (; n < i; n += 1) {
				for (var x = 0; x < prp.length; x += 1) {
					values[prp[x]] = prop(subject[n]).get(prp[x]);
				}
				return values;
			}
		},

		/**
		 * @description
		 * Remove property (attribute) from an element.
		 *
		 * @memberof $
		 * @method prop/kill
		 *
		 * @param {Array} prop The property whose value will be removed.
		 *
		 * @example
		 * $.prop.kill('property');
		 * $(selector).prop.kill('property');
		 */
		kill: function propKill(prp) {
			while (i--) subject[i].removeAttribute(prp);
		}
	};
};

/**
 * @memberof $
 * @method $.query
 *
 * @description
 * Look-up DOM elements and return them in an array.
 *
 * @param {Array|String|Nodelist|Element} target The element(s) that will be selected.
 * @param {Document|Element} context A parent whose children will be queried against the given `selector`. The default context is the current `document`.
 * @returns {Array} An element collection.
 *
 * @example
 * // Elemint object with cached elements
 * $(selector);
 *
 * // Array of elements
 * $.query(selector);
 *
 * // Shorthand for returning an array of elements
 * $.$(selector);
 */
var query = function query(selector, context) {
	var $elements;
	var selectorId;

	// Make sure the selector exists, if not kill the operation
	if (!selector) throw 'Invalid operation';

	// Fallback to document for the context if context is null
	context = context || document;

	// Strings
	if (selector.substring) {
		// Document-based queries only get cached using the selector as a reference
		// Custom context-based queries get a unique identifier + selector
		if (context !== document) {
			// Give the context an ID if needed
			context.id || (context.id = '_' + Date.now());
			selectorId = context.id + '_' + selector;
		}
		else selectorId = selector;

		// Require a context
		if (!context.nodeName) throw 'No context was provided.';

		// Cached
		if (queries.cache[selectorId]) $elements = queries.cache[selectorId];

		// Lookup
		else {
			/* eslint-disable indent */
			queries.cache[selectorId] = selector.search(reIdMatch) > -1
				? [context.getElementById(selector.slice(1))]
			: selector.search(reTagMatch) > -1
				? [context.getElementById(selector.slice(1))]
			: selector.search(reClassMatch) > -1
				? toArray(context.getElementsByClassName(selector.replace(reDotMatch, ' ')))
				: toArray(context.querySelectorAll(selector))
			;
			$elements = queries.cache[selectorId];
		}
	}
	// Array
	else if (Array.isArray(selector)) {
		$elements = flatten(selector);
	}
	// Put node/window in array
	else if (nodeTest(selector) || windowTest(selector)) {
		$elements = [selector];
	}
	// Is it a NodeList?
	else {
		try {
			$elements = toArray(selector);
		}
		catch (e) {
			throw selector + ' is an invalid selector.';
		}
	}
	return $elements;
};

/**
 * @memberof $
 * @method $.ready
 *
 * @description
 * Execute a function when the DOM is ready.
 *
 * @param {Function} callback A callback function.
 *
 * @example
 * $.ready(() => {
 *     // body...
 * });
 */
var ready = function ready(context, callback) {
	if (typeof context === 'function') {
		callback = context;
		context = document;
	}

	context.readyState === 'complete'
		|| context.readyState === 'loaded'
		|| (!(window.ActiveXObject || 'ActiveXObject' in window) && context.readyState === 'interactive')
		? callback.call(context)
		: context.addEventListener('DOMContentLoaded', callback.bind(context), 0)
	;
};

/**
 * @memberof $
 * @method $.remove
 *
 * @description
 * Remove elements from the DOM
 * - innerEnd: `afterend` of subject's last child
 * - innerBegin: `beforebegin` of subject's first child
 * - outerEnd: `afterend` of subject's last sibling
 * - outerBegin: `beforebegin` of subject's first sibling
 * - before: `beforebegin` of subject
 * - after: `afterend` of subject
 *
 * @param {Array|Element} subject The element(s) to remove OR the element(s) whose relatives will be removed.
 * @param {String} relative The relative to be removed.
 *
 * @example
 * // Self
 * $.remove(elements);
 * $(selector).remove();
 *
 * // Relative
 * $.remove(elements, location);
 * $(selector).remove(location);
 */
var remove = function remove(elements, location) {
	var locationTags = ['before', 'after', 'outerBegin', 'outerEnd', 'innerBegin', 'innerEnd'];
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);

	while (i--) {
		/* eslint-disable indent */
		if (locationTags.indexOf(location) > -1) {
			location === 'before'
				? elements[i].parentNode.removeChild(elements[i].previousElementSibling)
			: location === 'after'
				? elements[i].parentNode.removeChild(elements[i].nextElementSibling)
			: location === 'outerBegin'
				? elements[i].parentNode.removeChild(elements[i].parentNode.firstChild)
			: location === 'outerEnd'
				? elements[i].parentNode.removeChild(elements[i].parentNode.lastChild)
			: location === 'innerBegin'
				? elements.removeChild(elements[i].firstChild)
			: location === 'innerEnd'
				? elements.removeChild(elements[i].lastChild)
				: throwError('Unknown position')
			;
		}
		else if (location === 'inner') {
			while (elements.lastChild) elements[i].removeChild(elements[i].lastChild);
		}
		else elements[i].parentNode.removeChild(elements[i]);
	}
};

/**
 * @memberof $
 * @method $.render
 *
 * @description
 * Accept markup and return a collection of elements in an array.
 *
 * @param {String} html The markup that will be converted to elements.
 * @returns {Array} The resulting array of elements.
 *
 * @example
 * $.render(string);
 */
var render = function render(subject) {
	wrapper.innerHTML = subject;
	return toArray(wrapper.childNodes);
};

/**
 * @memberof $
 * @method $.sibling
 *
 * @description
 * Return all matched elements that share the same immediate parent as the subject (subject excluded).
 *
 * @param {Array|Element} subject The element(s) whose siblings will be selected.
 * @param {String} selector Query the siblings by selector.
 * @returns {Array} The subject(s) siblings.
 *
 * @example
 * $.sibling(elements, selector);
 * $(selector).sibling(selector);
 */
var sibling = function sibling(elements, selector) {
	var nodes;
	var children;
	var result = [];

	var i = elements.length;
	(i > 0) || (elements = [elements], i = 1);

	while (i--) {
		children = elements[i].parentNode.childNodes;
		n = children.length;

		while (n--) {
			// Get specific siblings
			if (children[n] !== elements[i] && children[n].matches(selector)) {
				result.push(children[n]);
			}
			// Get all sibling
			else if (children[n] !== elements[i]) {
				result.push(children[n]);
			}
		}
	}

	return (result.length > 1) ? result : result[0];
};

/**
 * @memberof $
 * @method $.size
 *
 * @description
 * Get or set the dimensions of an element.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.size(element);
 */
var size = function size(elements, opt) {
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);
	var key;

	return {
		/**
		 * @memberof $
		 * @method size/set
		 *
		 * @description
		 * Set the height/width of an element.
		 *
		 * @param {Array|Element} subject The element(s) whose dimensions will be set.
		 *
		 * @example
		 *
		 * $.size(element).set(config);
		 * $(selector).size.set(config);
		 */
		set: function (config) {
			while (i--) {
				for (key in config) {
					if (config.hasOwnProperty(key)) {
						if (key === 'width' || key === 'height') {
							elements[i].style[key] = config[key];
						}
					}
				}
			}
		},
		/**
		 * @memberof $
		 * @method size/get
		 *
		 * @description
		 * Get the height/width of an element.
		 *
		 * @param {Array|Element} subject The element(s) whose dimensions will be returned.
		 * @returns {Object} An object containing the element's dimensions.
		 *
		 * @example
		 *
		 * $.size(element).get();
		 * $(selector).size.get();
		 */
		get: function () {
			var container;
			var size;
			var result;
			var output = {};
			var dimensions = (opt instanceof Array) ? opt : ['height', 'width'];

			// Define the element
			if (typeof elements[0] !== 'undefined') {
				for (var n = 0; n < dimensions.length; n += 1) {
					dimensions[n] = dimensions[n][0].toUpperCase() + dimensions[n].slice(1);
					// Window
					if (windowTest(elements[0])) {
						result = Math.max(elements[0]['inner' + dimensions[n]]);
					}
					else {
						// Document/Element
						container = elements[0] || elements[0].body || elements[0].documentElement;
						size = container['offset' + dimensions[n]] || container['scroll' + dimensions[n]] || container['client' + dimensions[n]];
						result = Math.max(size);
					}
					var prop = dimensions[n].toLowerCase();
					output[prop] = result + 'px';
				}
			}
			return output;
		}
	};
};

/**
 * @memberof $
 * @method $.style
 *
 * @description
 * Manage document styles.
 *
 * @param {Element|Array|String} elementOrProp An element(s) or CSS selector.
 * @param {Document|Element} context The context which will be used - default is `document`.
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.style("div:before", document);
 * $.style(element);
 */
var style = function style(subject, doc) {
	var styles = '';
	var prop;
	var len;
	var i;

	// Set the document
	(!!doc || (!doc && $tyle.context !== document)) && styleDocument(doc);

	return {
		/**
		 * @memberof $
		 * @method style/set
		 *
		 * @description
		 * Get style values from an element.
		 *
		 * @param {Object|String} rulesOrProperty CSS key-pair list or a CSS property name.
		 * @param {String} value The style that will be applied.
		 *
		 * @example
		 * // Single rule injection into document stylesheets with object
		 * $.style("div:before").set({ prop: value, ... });
		 *
		 * // Single rule injection into document stylesheets with string
		 * $.style("div:before").set("{ prop: value, ... }");
		 *
		 * // Multiple rule injection into document stylesheets with string
		 * $.style("div:before { prop: value, ... } div:after { prop: value, ... } ...").set();
		 *
		 * // Multiple rule injection into document stylesheets with string via array
		 * $.style(["div:before { prop: value, ... }", "div:after { prop: value, ... }"]).set();
		 *
		 * // Inline rules
		 * $.style(element, optionalContext).set(style, value);
		 * $.style(element, optionalContext).set({ prop: value, ... });
		 * $(element).style.set(style, value, optionalContext);
		 * $(element).style.set({ prop: value, ... }, optionalContext);
		 */
		set: function styleSet(css, opt) {
			// Insert the new rules into a stylesheet
			if (subject && subject[0] && subject[0].substring) {
				if (toString(subject) === '[object Array]') {
					i = 0;
					len = subject.length;
					while (i < len) {
						$tyle.sheet.insertRule(subject[i], $tyle.sheet.cssRules.length);
						i += 1;
					}
				}
				// Single rule
				else if (!!opt && !!opt.substring) {
					subject += ' { ' + css + ':' + opt + '; }';
					$tyle.sheet.insertRule(subject, $tyle.sheet.cssRules.length);
				}
				// Multiple rules contained in an object
				else if (toString(css) === '[object Object]') {
					for (prop in css) {
						if (css.hasOwnProperty(prop)) {
							styles += prop + ':' + prop === 'content'
								? '\'' + css[prop] + '\';'
								: css[prop] + ';'
							;
						}
					}
					subject += ' { ' + styles + ' }';
					$tyle.sheet.insertRule(subject, $tyle.sheet.cssRules.length);
				}
				else if (subject.substring) {
					// Inject a stylesheet
					$tyle.element.appendChild($tyle.context.createTextNode(subject));
				}
			}
			// Apply the new rules inline on the selected elements
			else if (subject) {
				var key,
					n;
				i = subject.length;
				(i > 0) || (subject = [subject], i = 1);

				// Single CSS style
				if (!!css && !!css.substring && !!opt) {
					while (i--) {
						subject[i].style[css] = opt;
					}
				}

				// Loop through CSS object containing multiple styles and set them on each element
				else if (toString(css) === '[object Object]') {
					while (i--) {
						for (key in css) {
							if (css.hasOwnProperty(key)) {
								subject[i].style[key] = css[key];
							}
						}
					}
				}
				else {
					throwError('Argument failed. Invalid argument.');
				}
			}
		},
		/**
		 * @memberof $
		 * @method style/get
		 *
		 * @description
		 * Get style values from an element.
		 *
		 * @param {String} style The style(s) whose value will be returned.
		 * @returns {Object|String} CSS key-pair list or a CSS property value.
		 *
		 * @example
		 * $.style(element).get(prop1, prop2, propN, ...);
		 * $(selector).style.get(prop1, prop2, propN, ...);
		 */
		get: function styleGet() {
			i = subject.length;
			(i > 0) || (subject = [subject], i = 1);
			css = toArray(arguments);

			if (css.length === 1) return getStyleValue([subject[0]], css[0]);

			var values = {};
			var n = 0;
			i += 1;

			for (; n < i; n += 1) {
				x = css.length;
				while (x--) values[css[x]] = getStyleValue([subject[n]], css[x]);
				return values;
			}
		}
	};
};


		/**
		 * @description
		 * A function that returns an object containing chainable methods.
		 *
		 * @namespace $
		 *
		 * @param {String} selector A CSS selector used for querying the DOM
		 * @returns {Object} The Elemint DOM library object
		 *
		 * @example
		 * $(selector)
		 * $$(selector)
		 * elemint(selector)
		*/
		$$ = (function () {
			$$ = function (selector, context, opt) {
				// Initiate $$
				new $$.fn.init(selector, context, opt);
				// Return the chainable methods
				return stack();
			};

			// Build the $$ object
			$$.fn = $$.prototype = {
				constructor: $$,
				context: document,
				selector: '',
				$: [],
				init: function (selector, context) {
					$$.fn.context = context;
					$$.fn.selector = selector;
					$$.fn.$ = query(selector, context);
				}
			};

			// Pass 'init' the $$ prototype for later instantiation
			$$.fn.init.prototype = $$.fn;

			// Return the Elemint object
			// Set window.$ only if $ is undefined
			return (!window.$)
				? window.elemint = window.$$ = window.$ = $$
				: window.elemint = window.$$ = $$
			;
		}());

		$$.after = after;
		$$.animate = animate;
		$$.ascend = ascend;
		$$.before = before;
		$$.child = child;
		$$.class = classes;
		$$.descend = descend;
		$$.event = event;
		$$.fragment = fragment;
		$$.insert = insert;
		$$.layer = layer;
		$$.match = match;
		$$.mount = mount;
		$$.offset = offset;
		$$.parent = parent;
		$$.position = position;
		$$.print = print;
		$$.prop = prop;
		$$.query = $$.$ = query;
		$$.ready = ready;
		$$.remove = remove;
		$$.render = render;
		$$.sibling = sibling;
		$$.size = size;
		$$.style = style;

		return $$;
	}
	throwError(browser.unsupported);
}));
