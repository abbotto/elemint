/**
 * @memberof $
 * @method $.query
 *
 * @description
 * Look-up DOM elements and return them in an array.
 *
 * @param {Array|String|Nodelist|Element} target The element(s) that will be selected.
 * @param {Document|Element} context A parent whose children will be queried against the given `selector`. The default context is the current `document`.
 * @returns {Array} An element collection.
 *
 * @example
 * // Elemint object with cached elements
 * $(selector);
 *
 * // Array of elements
 * $.query(selector);
 *
 * // Shorthand for returning an array of elements
 * $.$(selector);
 */
var query = function query(selector, context) {
	var $elements;
	var selectorId;

	// Make sure the selector exists, if not kill the operation
	if (!selector) throw 'Invalid operation';

	// Fallback to document for the context if context is null
	context = context || document;

	// Strings
	if (selector.substring) {
		// Document-based queries only get cached using the selector as a reference
		// Custom context-based queries get a unique identifier + selector
		if (context !== document) {
			// Give the context an ID if needed
			context.id || (context.id = '_' + Date.now());
			selectorId = context.id + '_' + selector;
		}
		else selectorId = selector;

		// Require a context
		if (!context.nodeName) throw 'No context was provided.';

		// Cached
		if (queries.cache[selectorId]) $elements = queries.cache[selectorId];

		// Lookup
		else {
			/* eslint-disable indent */
			queries.cache[selectorId] = selector.search(reIdMatch) > -1
				? [context.getElementById(selector.slice(1))]
			: selector.search(reTagMatch) > -1
				? [context.getElementById(selector.slice(1))]
			: selector.search(reClassMatch) > -1
				? toArray(context.getElementsByClassName(selector.replace(reDotMatch, ' ')))
				: toArray(context.querySelectorAll(selector))
			;
			$elements = queries.cache[selectorId];
		}
	}
	// Array
	else if (Array.isArray(selector)) {
		$elements = flatten(selector);
	}
	// Put node/window in array
	else if (nodeTest(selector) || windowTest(selector)) {
		$elements = [selector];
	}
	// Is it a NodeList?
	else {
		try {
			$elements = toArray(selector);
		}
		catch (e) {
			throw selector + ' is an invalid selector.';
		}
	}
	return $elements;
};
