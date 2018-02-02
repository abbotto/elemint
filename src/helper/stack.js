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
