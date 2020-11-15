/**
 * @private
 * @description
 * A faster `bind` implementation
 *
 * @param {Function}
 * @return {Function}
 */

function bind(fn, context) {
	return function bindFnApply(...args) {
		return fn.apply(context, args);
	};
}
