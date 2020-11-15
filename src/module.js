(function (window) {
	// --------------------------------
	// Utilities
	// --------------------------------
	//=include util/browser.js
	//=include util/bind.js
	//=include util/styleValue.js
	//=include util/toString.js
	//=include util/findMatch.js
	//=include util/camelize.js
	//=include util/isEvent.js
	//=include util/isNode.js
	//=include util/styleModel.js

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
	 * elemint(elementOrSelector)
	 */

	// Elemint DOM query function
	window.elemint = (selector, context) => {
		elemint.fn.context = context || document;
		elemint.fn.$ =
			selector !== window ? query(selector, elemint.fn.context) : [selector];
		elemint.fn.selector = selector;

		// eslint-disable-next-line new-cap
		return new elemint.fn();
	};

	// All instances of 'elemint.fn' are functional instances of Elemint.
	// Assigning 'elemint.fn' as the prototype allows `elemint.fn.<method>` to be
	// available on all Elemint objects.
	elemint.fn = elemint.prototype = function $fn() {};
	elemint.fn.prototype = elemint.fn;

	//=include api/plugin.js

	// Prevent '$' name conflicts with other libraries
	if (!window.$) {
		window.$ = elemint;
	}

	// Create an exportable module in a NodeJS environment
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = elemint;
	}

	// Chained API
	elemint.fn.after = $after;
	elemint.fn.ascend = $ascend;
	elemint.fn.before = $before;
	elemint.fn.child = $child;
	elemint.fn.class = $class;
	elemint.fn.descend = $descend;
	elemint.fn.event = $event;
	elemint.fn.layer = $layer;
	elemint.fn.match = $match;
	elemint.fn.mount = $mount;
	elemint.fn.offset = $offset;
	elemint.fn.parent = $parent;
	elemint.fn.prop = $prop;
	elemint.fn.sibling = $sibling;
	elemint.fn.size = $size;
	elemint.fn.style = $style;
	elemint.fn.unmount = $unmount;

	// Unchained API
	elemint.after = after;
	elemint.animate = animate;
	elemint.ascend = ascend;
	elemint.before = before;
	elemint.child = child;
	elemint.class = classes;
	elemint.descend = descend;
	elemint.event = event;
	elemint.fragment = fragment;
	elemint.layer = layer;
	elemint.match = match;
	elemint.mount = mount;
	elemint.offset = offset;
	elemint.parent = parent;
	elemint.prop = prop;
	elemint.query = elemint.$ = query;
	elemint.ready = ready;
	elemint.render = render;
	elemint.sibling = sibling;
	elemint.size = size;
	elemint.style = style;
	elemint.unmount = unmount;
	elemint.watch = watch;

	//=include version

	return elemint;
})(window || global || globalThis);
