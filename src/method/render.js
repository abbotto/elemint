/**
 * @memberof $
 * @method $.render
 *
 * @description
 * Accept markup and return a collection of elements in an array.
 *
 * @param {String} payload The markup that will be converted to elements.
 * @return {Array} The resulting array of elements.
 *
 * @example
 * $.render(payload);
 */
var render = function render(subject) {
	wrapper.innerHTML = subject;
	return toArray(wrapper.childNodes);
};
