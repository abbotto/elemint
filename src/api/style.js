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
 * $.style(target, context);
 * $(target).style;
 * $(target, context).style;
 */

function style(subject, context) {
	let i = subject ? subject.length : 0;
	i > 0 || ((subject = [subject]), (i = 1));

	return {
		get: bind(styleGet, subject[0]),
		set: bind(styleSet, [subject, i, context])
	};
}

const $style = {
	get: function chainStyleGet(...props) {
		return styleGet.apply(elemint.fn.$[0], props);
	},
	set: function chainStyleSet(objectOrString, value) {
		style(elemint.fn.$, elemint.fn.context).set(objectOrString, value);
		return elemint.fn;
	}
};
