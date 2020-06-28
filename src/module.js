(function (window) {
	//=include util/browser.js

	// --------------------------------
	// Utilities
	// --------------------------------
	//=include util/bind.js
	//=include util/domStyle.js
	//=include util/toString.js
	//=include util/findMatch.js
	//=include util/camelize.js
	//=include util/isEvent.js
	//=include util/isNode.js
	//=include util/raf.js

	// --------------------------------
	// API
	// --------------------------------
	//=include api/animate/animate.set.js
	//=include api/animate/animate.void.js
	//=include api/class/class.set.js
	//=include api/class/class.swap.js
	//=include api/class/class.void.js
	//=include api/event/event.emit.js
	//=include api/event/event.set.js
	//=include api/event/event.void.js
	//=include api/layer/layer.get.js
	//=include api/layer/layer.set.js
	//=include api/offset/offset.get.js
	//=include api/offset/offset.set.js
	//=include api/prop/prop.get.js
	//=include api/prop/prop.set.js
	//=include api/prop/prop.test.js
	//=include api/prop/prop.void.js
	//=include api/size/size.get.js
	//=include api/size/size.set.js
	//=include api/style/style.get.js
	//=include api/style/style.set.js
	//=include api/watch/watch.set.js
	//=include api/watch/watch.void.js
	//=include api/after.js
	//=include api/animate.js
	//=include api/ascend.js
	//=include api/before.js
	//=include api/child.js
	//=include api/class.js
	//=include api/descend.js
	//=include api/event.js
	//=include api/fragment.js
	//=include api/layer.js
	//=include api/match.js
	//=include api/mount.js
	//=include api/offset.js
	//=include api/parent.js
	//=include api/position.js
	//=include api/prop.js
	//=include api/query.js
	//=include api/ready.js
	//=include api/render.js
	//=include api/sibling.js
	//=include api/size.js
	//=include api/style.js
	//=include api/unmount.js
	//=include api/watch.js

	/**
	 * @namespace $
	 * @param {String|Element|Object} selector Usually a CSS selector or element that will be targeted in the DOM.
	 * Some methods will accept the `window` object if it is passed in.
	 * @param {Document|Element} context An optional parent whose children will be queried.
	 * @return {Object} The Elemint DOM library object.
	 *
	 * @description
	 * A function that performs a DOM query or passes along the `window` object and returns chainable methods.
	 *
	 * @example
	 * $(elementOrSelector)
	 * $$(elementOrSelector)
	 * elemint(elementOrSelector)
	 */

	// Elemint DOM query function
	$$ = window.$$ = window.elemint = (selector, context) => {
		$$.fn.context = context || document;
		$$.fn.$ = selector !== window ? query(selector, $$.fn.context) : [selector];
		$$.fn.selector = selector;

		// eslint-disable-next-line new-cap
		return new $$.fn();
	};

	// All instances of '$$.fn' are functional instances of Elemint.
	// Assigning '$$.fn' as the prototype allows `$$.fn.<plugin>` to be
	// available on all Elemint objects.
	$$.fn = $$.prototype = function $$fn() {};
	$$.fn.prototype = $$.fn;

	// Prevent '$' name conflicts with other libraries
	if (!window.$) {
		window.$ = $$;
	}

	// Create an exportable module in a NodeJS environment
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = $$;
	}

	// Chained API
	$$.fn.after = $$after;
	$$.fn.ascend = $$ascend;
	$$.fn.before = $$before;
	$$.fn.child = $$child;
	$$.fn.class = $$class;
	$$.fn.descend = $$descend;
	$$.fn.event = $$event;
	$$.fn.layer = $$layer;
	$$.fn.match = $$match;
	$$.fn.mount = $$mount;
	$$.fn.offset = $$offset;
	$$.fn.parent = $$parent;
	$$.fn.position = $$position;
	$$.fn.prop = $$prop;
	$$.fn.sibling = $$sibling;
	$$.fn.size = $$size;
	$$.fn.style = $$style;
	$$.fn.unmount = $$unmount;

	// Unchained API
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
	$$.watch = watch;

	return $$;
})(globalThis || global || window);
