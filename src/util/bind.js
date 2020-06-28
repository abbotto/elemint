/**
 * @private
 * @description
 * A faster `bind` implementation
 *
 * @param {Function}
 * @return {Function}
 */

function bind(fn, context) {
	return function fnApply() {
		return fn.apply(context, arguments);
	};
}
