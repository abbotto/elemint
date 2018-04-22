/**
 * @private
 * @description
 * Return a copy of the $$ chainable stack
 *
 * @param {Object}
 * @return {Object}
 */
function chain(result) {
	// Reset `$$.fn.selector` if a selector is passed in
	if (result) {
		$$.fn.selector = $$.fn.$ = result;
	}

	return {
		constructor: $$.fn.constructor,
		context: $$.fn.context,
		selector: $$.fn.selector,
		$: $$.fn.$,
		after: function (selector) {
			return chain(after(this.$, selector));
		},
		ascend: function (selector, limit) {
			return chain(ascend(this.$, selector, limit));
		},
		before: function (selector) {
			return chain(before(this.$, selector));
		},
		child: function (selector) {
			return chain(child(this.$, selector));
		},
		class: {
			set: function (classList) {
				classes($$.fn.$).set(classList);
				return $$.fn;
			},
			kill: function (classList) {
				classes($$.fn.$).kill(classList);
				return $$.fn;
			},
			sub: function (classA, classB) {
				classes($$.fn.$).sub(classA, classB);
				return $$.fn;
			}
		},
		descend: function (selector, limit) {
			return chain(descend(this.$, selector, limit));
		},
		event: {
			set: function (config) {
				event($$.fn.$).set(config);
				return $$.fn;
			},
			kill: function (eventId, callback) {
				event($$.fn.$).kill(eventId, callback);
				return $$.fn;
			},
			emit: function (eventName, config) {
				event($$.fn.$).emit(eventName, config);
				return $$.fn;
			}
		},
		layer: {
			set: function (zIndex) {
				layer($$.fn.$).set(zIndex);
				return $$.fn;
			},
			get: function () {
				return layer($$.fn.$).get();
			}
		},
		match: function (selector, callback) {
			return chain(match(this.$, selector, callback));
		},
		mount: function (position, payload) {
			mount(this.$, position, payload);
			return this;
		},
		offset: {
			set: function (config) {
				offset($$.fn.$).set(config);
				return $$.fn;
			},
			get: function () {
				return offset($$.fn.$).get();
			}
		},
		parent: function (offsetParent) {
			return chain(parent(this.$, offsetParent));
		},
		position: function () {
			return position(this.$[0]);
		},
		prop: {
			set: function (prp, value) {
				prop($$.fn.$).set(prp, value);
				return $$.fn;
			},
			get: function () {
				return propGet.apply($$.fn.$[0], arguments);
			},
			kill: function (prp) {
				prop($$.fn.$).kill(prp);
				return $$.fn;
			}
		},
		sibling: function (selector) {
			var result = sibling(this.$, selector);
			result = (result.length > 1) ? result : [result];
			return chain(result);
		},
		size: {
			set: function (config) {
				size($$.fn.$).set(config);
				return $$.fn;
			},
			get: function (heightOrWidth) {
				return size($$.fn.$).get(heightOrWidth);
			}
		},
		style: {
			set: function (objectOrString, value) {
				style($$.fn.$, $$.fn.context).set(objectOrString, value);
				return $$.fn;
			},
			get: function (styleName, opt) {
				return styleGet.apply($$.fn.$[0], arguments);
			}
		},
		unmount: function (position, target) {
			unmount(this.$, position, target);
			return this;
		}
	};
}
