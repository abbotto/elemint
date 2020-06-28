/**
 * @memberof $
 * @method style
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

function style(subject, doc) {
	let i = subject ? subject.length : 0;
	i > 0 || ((subject = [subject]), (i = 1));

	(doc || (!doc && $style.context !== document)) && styleDocument(doc);

	return {
		get: bind(styleGet, subject[0]),
		set: bind(styleSet, [subject, i])
	};
}

$$style = {
	get: function chainGet(styleName, opt) {
		return styleGet.apply($$.fn.$[0], arguments);
	},
	set: function chainSet(objectOrString, value) {
		style($$.fn.selector, $$.fn.context).set(objectOrString, value);
		return $$.fn;
	}
};
