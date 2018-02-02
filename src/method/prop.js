/**
 * @memberof $
 * @method $.prop
 *
 * @description
 * Manage element properties (attributes)
 *
 * @param {Array|Element} target The target element(s)
 * @return {Object} methods An object containing the 'set, get, kill' methods
 *
 * @example
 * $.prop(target);
 * $(target).prop;
 */
var prop = function (subject) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	return {
		get: bind(propGet, subject[0]),
		kill: bind(propKill, [subject, i]),
		set: bind(propSet, [subject, i])
	};
};

