/**
 * @memberof $
 * @method $.parent
 *
 * @description
 * Return the parent of the matched elements.
 *
 * @param {Array|Element} subject The element whose parent will be selected.
 * @returns {Array} The parent element.
 *
 * @example
 * $.parent(elements);
 * $(selector).parent();
 */
var parent = function parent(elements) {
	var result = [];
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);
	while (i--) {
		// Define the element
		result.push(elements[i].parentNode);
	}
	return result;
};
