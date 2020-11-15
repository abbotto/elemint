/**
 * @memberof $
 * @method match
 *
 * @description
 * Return a set of elements that match the selector or pass the test.
 *
 * @param {Array|Element} target The set of elements.
 * @param {String} selectorOrTest A query selector or a testing function used to find a match.
 * @param {Function|Undefined} test A testing function used to find a match.
 *
 * @example
 * $.match(target, selectorOrTest, test);
 * $(target).match(selectorOrTest, test);
 */

function match(subject, selector, callback) {
	/* eslint-disable indent */
	return selector.substring && typeof callback === 'function'
		? findMatch(subject, (el) => {
				if (el.matches(selector)) return callback(el);
		  })
		: selector.substring
		? findMatch(subject, (el) => {
				return el.matches(selector);
		  })
		: typeof selector === 'function' &&
		  findMatch(subject, (el) => {
				return selector(el);
		  });
}

const $match = function chainMatch(selector, callback) {
	return elemint(match(this.$, selector, callback));
};
