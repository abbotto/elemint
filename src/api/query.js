/**
 * @memberof $
 * @method query
 *
 * @description
 * Look up DOM elements and return them in an array.
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

function query(selector, context) {
	const root = context || document;
	// Query by tagName, id, or className(s)
	if (/^((#|\.)?[\w-]+|((\.[\w-]+)(\s\.[\w-]+)+?)+)$/.test(selector)) {
		const prefix = selector.charAt(0);

		if (prefix === '#') {
			return [root.getElementById(selector.slice(1))];
		} else if (prefix === '.') {
			return Array.prototype.slice.call(
				root.getElementsByClassName(selector.replace(/\./g, ''))
			);
		}

		return Array.prototype.slice.call(root.getElementsByTagName(selector));
	}
	// Fallback to 'querySelectorAll'
	else if (typeof selector === 'string') {
		return Array.prototype.slice.call(root.querySelectorAll(selector));
	}
	// Handle DOM nodes
	else if (isNode(selector)) {
		return [selector];
	}
	// Convert a Nodelist to an array
	else if (selector[0] && selector[0].nodeType) {
		return Array.prototype.slice.call(selector);
	}

	throw new Error('Invalid argument.');
}
