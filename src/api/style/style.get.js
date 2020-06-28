/**
 * @memberof $
 * @method style.get
 *
 * @description
 * Get style values from an element.
 *
 * @param {String} style The style(s) whose value will be returned.
 * @return {Object|String} CSS key-pair list or a CSS property value.
 *
 * @example
 * $.style(target).get(prop1, prop2, propN, ...);
 * $(target).style.get(prop1, prop2, propN, ...);
 */
function styleGet(...names) {
	const subject = this;

	// Return a single property for the first matched item
	if (names.length === 1) {
		return getStyleValue(subject, names[0]);
	}

	const values = {};
	let i = names.length;

	// Return the values in an object for the first matched item
	while (i--) values[names[i]] = getStyleValue(subject, names[i]);
	return values;
}
