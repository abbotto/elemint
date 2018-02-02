/**
 * @memberof $
 * @method $.size
 *
 * @description
 * Get or set the dimensions of an element.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.size(target);
 * $(target).size;
 */
var size = function size(subject) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	return {
		get: bind(sizeGet, subject[0]),
		set: bind(sizeSet, [subject, i])
	};
};
