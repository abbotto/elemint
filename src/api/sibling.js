/**
 * @memberof $
 * @method sibling
 *
 * @description
 * Return all matched elements that share the same immediate parent as the subject (subject excluded).
 *
 * @param {Array|Element} target The element(s) whose siblings will be selected.
 * @param {String} selector Query the siblings by selector.
 * @return {Array} The subject(s) siblings.
 *
 * @example
 * $.sibling(target, optionalSelector);
 * $(target).sibling(optionalSelector);
 */

function sibling(subject, selector) {
	let children;
	const result = [];

	let i = subject.length;
	i > 0 || ((subject = [subject]), (i = 1));

	while (i--) {
		children = subject[i].parentNode.childNodes;
		n = children.length;

		while (n--) {
			// Get specific siblings
			if (children[n] !== subject[i] && children[n].matches(selector)) {
				result.unshift(children[n]);
			}
			// Get all siblings
			else if (children[n] !== subject[i]) {
				result.unshift(children[n]);
			}
		}
	}

	return result.length > 1 ? result : result[0];
}

const $sibling = function chainSibling(selector) {
	let result = sibling(this.$, selector);
	result = result.length > 1 ? result : [result];
	return elemint(result);
};
