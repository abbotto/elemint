/**
 * @memberof $
 * @method $.descend
 *
 * @description
 * Find all matched descendant elements within the parent element(s).
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} selector The target ancestors.
 * @returns {Array} Ancestors that match the selector.
 *
 * @example
 * $.descend(element, selector);
 */
var descend = function descend(subject, selector) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var result = query(selector, subject[i]);
	i--;

	while (i--) result.concat(query(selector, subject[i]));

	return result;
};
