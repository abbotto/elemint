/**
 * @memberof $
 * @method after
 *
 * @description
 * Return the immediately following sibling OR next matched sibling of each element in the set of matched elements.
 *
 * @param {Array|Element} target The element(s) whose next sibling will be obtained.
 * @param {String} selector Return the next sibling that matches the given selector.
 * @return {Array|Element} Element collection.
 *
 * @example
 * $.after(target, optionalSelector);
 * $(target).after(optionalSelector);
 */

function after(subject, selector) {
	const result = [];

	let i = 0;
	let len = subject.length;

	len > 0 || ((subject = [subject]), (len = 1));

	if (selector && selector.substring) {
		while (subject[i]) {
			subject[i + 1] = subject[i].nextElementSibling;

			if (subject[i + 1] && subject[i + 1].matches(selector)) {
				result.push(subject[i + 1]);
				break;
			}

			i += 1;
		}
	} else {
		while (subject[i]) {
			result.push(subject[i].nextElementSibling);
			i += 1;
		}
	}

	return result;
}

const $after = function chainAfter(selector) {
	return elemint(after(this.$, selector));
};
