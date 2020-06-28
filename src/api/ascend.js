/**
 * @memberof $
 * @method ascend
 *
 * @description
 * Find all the matched ancestors at each upper level relative to the subject.
 * Will return `n` levels of anscestors until the limit is reached.
 *
 * @param {Element|Array} target The element(s) whose ancestors will be returned.
 * @param {String} selectorOrLimit The target ancestor or the number of ancestors to return.
 * @param {Number} limit Limit how many ancestors will be returned.
 * @return {Array|Object} An array of ancestors that match the given selector.
 *
 * @example
 * $.ascend(target, optionalSelectorOrLimit, limit);
 * $(target).ascend(optionalSelectorOrLimit, limit);
 */

function ascend(subject, selector, limit) {
	// Depth was passed in the selector position
	if (parseInt(selector, 10)) {
		limit = selector;
		selector = null;
	}

	let i = -1;
	let len = subject.length;
	len > 0 || ((subject = [subject]), (len = 1));

	const collector = [];
	let limitCount = 0;

	while ((i += 1) < len) {
		let element = subject[i];

		while (element.parentElement && (!limit || limitCount <= limit)) {
			limitCount += 1;
			element = element.parentElement;

			if (!selector || element.matches(selector)) {
				collector.push(element);
			}
		}

		limitCount = 0;
	}

	return collector;
}

$$ascend = function chainAscend(selector, limit) {
	return $$(ascend(this.$, selector, limit));
};
