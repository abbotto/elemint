/**
 * @memberof $
 * @method $.ascend
 *
 * @description
 * Return the ancestors of the matched elements.
 *
 * @param {Element|Array} subject The element(s) whose ancestors will be returned.
 * @param {String} selector Narrow the search result by selector.
 * @param {Number} limit Limit how many ancestors will be returned.
 * @returns {Array|Object} Array containing the matched ancestors.
 *
 * @example
 * $.ascend(element, selector, limit);
 * $(element).ascend(selector, limit);
 */
var ascend = function ascend(subject, selector, limit) {
	var result = [];
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);
	n = limit ? 1 : 0;
	limit = limit || i;

	// Get all ancestors
	if (!selector) {
		while (i-- && i > -1) {
			while (subject[i].parentElement && n <= limit) {
				subject[i] = subject[i].parentElement;
				result.unshift(subject[i]);
				n = (n !== 0) ? n + 1 : n;
			}
		}
	}
	// Get specific ancestor(s)
	else {
		while (i-- && i > -1) {
			while (subject[i].parentElement && n <= limit) {
				subject[i] = subject[i].parentElement;
				if (subject[i].matches(selector)) {
					result.unshift(subject[i]);
				}
				n = (n !== 0) ? n + 1 : n;
			}
		}
	}

	return result;
};
