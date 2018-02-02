(function (name, global, factory) {
	if (typeof define === 'function' && define.amd) {
		define([name], factory);
	}
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	}
	else {
		global[name] = factory();
	}
}('elemint', window || this, function () {
	var document = window.document;
	var noop = function () {};
	var wrapper = document.createElement('wrapper');

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
	//=include helper/throwError.js
	//=include helper/browser.js

	if (browser.supported) {
		/* eslint-disable no-inner-declarations */
		//=include helper/bind.js
		//=include helper/toString.js
		//=include helper/toArray.js
		//=include helper/compatibility.js
		//=include helper/findMatch.js
		//=include helper/camelize.js
		//=include helper/emitList.js
		//=include helper/eventTest.js
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
		//=include helper/chain.js

		//=include method/after.js
		//=include method/animate/animate.kill.js
		//=include method/animate/animate.set.js
		//=include method/animate.js
		//=include method/ascend.js
		//=include method/before.js
		//=include method/child.js
		//=include method/class/class.kill.js
		//=include method/class/class.set.js
		//=include method/class/class.sub.js
		//=include method/class.js
		//=include method/descend.js
		//=include method/event/event.emit.js
		//=include method/event/event.kill.js
		//=include method/event/event.set.js
		//=include method/event.js
		//=include method/fragment.js
		//=include method/layer/layer.get.js
		//=include method/layer/layer.set.js
		//=include method/layer.js
		//=include method/match.js
		//=include method/mount.js
		//=include method/offset/offset.get.js
		//=include method/offset/offset.set.js
		//=include method/offset.js
		//=include method/parent.js
		//=include method/position.js
		//=include method/prop/prop.get.js
		//=include method/prop/prop.kill.js
		//=include method/prop/prop.set.js
		//=include method/prop.js
		//=include method/query.js
		//=include method/ready.js
		//=include method/render.js
		//=include method/sibling.js
		//=include method/size/size.get.js
		//=include method/size/size.set.js
		//=include method/size.js
		//=include method/style/style.get.js
		//=include method/style/style.set.js
		//=include method/style.js
		//=include method/unmount.js

		/**
		 * @namespace $
		 * @param {String} target A CSS selector or element that will be targeted in the DOM.
		 * @param {Document|Element} context An optional parent whose children will be queried.
		 * @return {Object} The Elemint DOM library object.
		 *
		 * @description
		 * A function that returns the following chainable methods.
		 * - after
		 * - ascend
		 * - before
		 * - child
		 * - class (kill, set, sub)
		 * - descend
		 * - event (emit, kill, set)
		 * - layer
		 * - match
		 * - mount
		 * - offset
		 * - parent
		 * - position
		 * - prop (get, kill, set)
		 * - sibling
		 * - size (get, set)
		 * - style (get, set)
		 * - unmount
		 *
		 * @example
		 * $(elementOrSelector)
		 * $$(elementOrSelector)
		 * elemint(elementOrSelector)
		*/
		$$ = (function () {
			$$ = function (selector, context, opt) {
				new $$.fn.init(selector, context, opt);
				return chain();
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
		$$.layer = layer;
		$$.match = match;
		$$.mount = mount;
		$$.offset = offset;
		$$.parent = parent;
		$$.position = position;
		$$.prop = prop;
		$$.query = $$.$ = query;
		$$.ready = ready;
		$$.render = render;
		$$.sibling = sibling;
		$$.size = size;
		$$.style = style;
		$$.unmount = unmount;

		return $$;
	}

	throwError(browser.unsupported);
}));
