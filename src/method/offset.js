/**
 * @memberof $
 * @method $.offset
 *
 * @description
 * Manage element offsets.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.offset(target);
 * $(target).offset;
 */
var offset = function offset(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	return {
		get: bind(offsetGet, subject[0]),
		set: bind(offsetSet, [subject, i])
	};
};
