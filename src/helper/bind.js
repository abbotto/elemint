/**
 * @private
 * @param {Function}
 * @return {Function}
 */
function bind(fn, context) {
	return function binder() {
		return fn.apply(context, arguments);
	};
}
