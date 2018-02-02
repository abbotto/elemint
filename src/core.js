/**
 * Elemint
 * Description: Tricks for the DOM
 * Author: Jared Abbott
 * URL: https://github.com/abbotto/elemint/
 * Copyright 2018 Jared Abbott
 * Distributed under the MIT license
 * Version %%VERSION%%
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

	//=include helper/regex.js
	//=include helper/browser.js

	// Will this browser cut the mustard?
	if (browser.supported) {
		//=include helper/toString.js
		//=include helper/toArray.js
		//=include helper/compatibility.js
		//=include helper/findMatch.js
		//=include helper/caf.js
		//=include helper/camelize.js
		//=include helper/eventList.js
		//=include helper/flatten.js
		//=include helper/interval.js
		//=include helper/loop.js
		//=include helper/merge.js
		//=include helper/nodeCache.js
		//=include helper/nodeTest.js
		//=include helper/raf.js
		//=include helper/styleDocument.js
		//=include helper/styleValue.js
		//=include helper/windowTest.js
		//=include helper/stack.js

		//=include method/after.js
		//=include method/animate.js
		//=include method/ascend.js
		//=include method/before.js
		//=include method/child.js
		//=include method/class.js
		//=include method/descend.js
		//=include method/event.js
		//=include method/fragment.js
		//=include method/insert.js
		//=include method/layer.js
		//=include method/match.js
		//=include method/mount.js
		//=include method/offset.js
		//=include method/parent.js
		//=include method/position.js
		//=include method/print.js
		//=include method/prop.js
		//=include method/query.js
		//=include method/ready.js
		//=include method/remove.js
		//=include method/render.js
		//=include method/sibling.js
		//=include method/size.js
		//=include method/style.js

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
