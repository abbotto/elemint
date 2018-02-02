/**
 * @memberof $
 * @method $.query
 *
 * @description
 * Look-up DOM elements and return them in an array.
 *
 * @param {Array|String|Nodelist|Element} target The element(s) that will be selected.
 * @param {Document|Element} context A parent whose children will be queried against the given `selector`. The default context is the current `document`.
 * @return {Array} An element collection.
 *
 * @example
 * // Elemint object with cached elements
 * $(target);
 *
 * // Array of elements
 * $.query(selector);
 *
 * // Shorthand for returning an array of elements
 * $.$(target);
 */
var query = function query(selector, context) {
	var selectorId;
	var selectorError = selector + ' is an invalid selector.';

	if (!selector) throwError('Please provide a selector.');
	context = context || document;

	if (selector.substring) {
		if (context !== document) {
			if (!context.nodeName) {
				throwError('Invalid or missing context.');
			}

			context.id || (context.id = context.tagName + '_' + Date.now());
			selectorId = context.id + '_' + selector;
		}
		else {
			selectorId = selector;
		}

		if (queries.cache[selectorId]) {
			return queries.cache[selectorId];
		}

		try {
			/* eslint-disable indent */
			queries.cache[selectorId] = selector.search(reIdMatch) > -1
				? [context.getElementById(selector.slice(1))]
			: selector.search(reTagMatch) > -1
				? toArray(context.getElementsByTagName(selector))
			: selector.search(reClassMatch) > -1
				? toArray(context.getElementsByClassName(selector.replace(reDotMatch, ' ')))
				: toArray(context.querySelectorAll(selector))
			;

			return queries.cache[selectorId];
		}
		catch (e) {
			return throwError(selectorError);
		}
	}
	else if (nodeTest(selector) || windowTest(selector)) {
		return [selector];
	}
	else if (selector[0] && selector[0].nodeType) {
		return toArray(selector);
	}

	return throwError(selectorError);
};
