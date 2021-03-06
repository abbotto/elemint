/**
 * @memberof $
 * @method $.child
 *
 * @description
 * Return the immediate children of the matched elements.
 *
 * @param {Array|Element} target The parent element(s).
 * @param {String} selector Find a specific subset of children.
 * @return {Array} A collection of the selected element's children.
 *
 * @example
 * $.child(target, optionalSelector);
 * $(target).child(optionalSelector);
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
