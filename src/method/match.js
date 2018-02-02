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
