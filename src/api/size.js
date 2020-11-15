/**
 * @memberof $
 * @method size
 *
 * @description
 * Get or set the dimensions of an element.
 *
 * @param {Array|Element|Object} target The target element(s) or `window` object.
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.size(target);
 * $(target).size;
 */

function size(subject) {
	let i = subject.length || 0;
	i > 0 || ((subject = [subject]), (i = 1));

	return {
		get: bind(sizeGet, subject[0]),
		set: bind(sizeSet, [subject, i])
	};
}

const $size = {
	get: function chainSizeGet(heightOrWidth) {
		return size(elemint.fn.$).get(heightOrWidth);
	},
	set: function chainSizeSet(config) {
		size(elemint.fn.$).set(config);
		return elemint.fn;
	}
};
