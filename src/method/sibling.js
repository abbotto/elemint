/**
 * @memberof $
 * @method $.sibling
 *
 * @description
 * Return all matched elements that share the same immediate parent as the subject (subject excluded).
 *
 * @param {Array|Element} subject The element(s) whose siblings will be selected.
 * @param {String} selector Query the siblings by selector.
 * @returns {Array} The subject(s) siblings.
 *
 * @example
 * $.sibling(elements, selector);
 * $(selector).sibling(selector);
 */
var sibling = function sibling(elements, selector) {
	var nodes;
	var children;
	var result = [];

	var i = elements.length;
	(i > 0) || (elements = [elements], i = 1);

	while (i--) {
		children = elements[i].parentNode.childNodes;
		n = children.length;

		while (n--) {
			// Get specific siblings
			if (children[n] !== elements[i] && children[n].matches(selector)) {
				result.push(children[n]);
			}
			// Get all sibling
			else if (children[n] !== elements[i]) {
				result.push(children[n]);
			}
		}
	}

	return (result.length > 1) ? result : result[0];
};
