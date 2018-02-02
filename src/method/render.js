/**
 * @memberof $
 * @method $.render
 *
 * @description
 * Accept markup and return a collection of elements in an array.
 *
 * @param {String} html The markup that will be converted to elements.
 * @returns {Array} The resulting array of elements.
 *
 * @example
 * $.render(string);
 */
var render = function render(subject) {
	wrapper.innerHTML = subject;
	return toArray(wrapper.childNodes);
};
