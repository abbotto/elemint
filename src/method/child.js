/**
 * @memberof $
 * @method $.child
 *
 * @description
 * Return the immediate children of the matched elements.
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} selector Find a specific subset of children.
 * @returns {Array} A collection of the selected element's children.
 *
 * @example
 * $.child(element);
 * $.child(element, selector);
 *
 * $(selector).child();
 * $(selector).child(selector);
 */
var child = function child(subject, selector) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var result = [];
	var children;
	var n;

	if (selector) {
		while (i--) {
			children = subject[i].children;
			n = children.length;

			while (n--) children[n].matches(selector) && result.unshift(children[n]);
		}
	}
	else {
		while (i--) {
			children = subject[i].childNodes;
			n = children.length;

			while (n--) result.unshift(children[n]);
		}
	}

	return result;
};
