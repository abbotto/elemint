/**
 * @memberof $
 * @method style/get
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
function styleGet() {
	var subject = this;

	// Pass list of styleNames
	var styleName = toArray(arguments);

	// Return a single property for the first matched item
	if (styleName.length === 1) return getStyleValue(subject, styleName[0]);

	var values = {};
	var i = styleName.length;

	// Return the values in an object for the first matched item
	while (i--) values[styleName[i]] = getStyleValue(subject, styleName[i]);
	return values;
}
