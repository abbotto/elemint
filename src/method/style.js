/**
 * @memberof $
 * @method $.style
 *
 * @description
 * Manage document styles.
 *
 * @param {Element|Array|String} elementOrProp An element(s) or CSS selector.
 * @param {Document|Element} context The context which will be used - default is .
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.style(target);
 * $.style(target, document);
 * $(target).style;
 * $(target, document).style;
 */
var style = function style(subject, doc) {
	var i = subject ? subject.length : 0;
	(i > 0) || (subject = [subject], i = 1);

	(doc || (!doc && $tyle.context !== document)) && styleDocument(doc);

	return {
		get: bind(styleGet, subject[0]),
		set: bind(styleSet, [subject, i])
	};
};
