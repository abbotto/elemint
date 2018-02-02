/**
 * @memberof $
 * @method $.before
 *
 * @description
 * Return the immediately preceding sibling OR preceding matched sibling of each element in the set of matched elements.
 *
 * @param {Array|Element} target The element(s) whose preceding sibling will be obtained.
 * @param {String} selector Return a preceding sibling that matches the given selector.
 * @return {Array|Element} Element collection.
 *
 * @example
 * $.before(target, optionalSelector);
 * $(target).before(optionalSelector);
 */
var before = function before(subject, selector) {
	var sib,
		result = [];
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	if (selector && selector.substring) {
		while (subject[i - 1]) {
			subject[i - 2] = subject[i - 1].previousElementSibling;

			if (subject[i - 2].matches(selector)) {
				result.push(subject[i - 2]);
				break;
			}

			i--;
		}
	}
	else while (i--) result.push(subject[i].previousElementSibling);

	// Update the values we need to be returned in chain()
	return result;
};
