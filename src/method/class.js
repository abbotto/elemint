/**
 * @description
 * Manipulate element classes
 *
 * @memberof $
 * @method $.class
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, kill, sub, test' methods.
 *
 * @example
 * $.class(target);
 * $(target).class;
 */
var classes = function classes(subject) {
	var i = subject ? subject.length : 0;
	(i > 0) || (subject = [subject], i = 1);

	return {
		kill: bind(classKill, [subject, i]),
		set: bind(classSet, [subject, i]),
		sub: bind(classSub, [subject, i])
	};
};
