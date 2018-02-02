/**
 * @description
 * Get a value from an element property (attribute).
 *
 * @memberof $
 * @method prop/get
 *
 * @param {String} prop A comma-separated list of properties whose value(s) will be fetched.
 * @return {Object|String} prop An object with property key-values or a single value string.
 *
 * @example
 * $.prop(target).get('property');
 * $.prop(target).get('propertyA', 'propertyB');
 * $(target).prop.get('property');
 * $(target).prop.get('propertyA', 'propertyB');
 */
function propGet() {
	var subject = this;

	// Pass list of attributes
	var props = toArray(arguments);

	// Return a single property for the first matched item
	if (props.length === 1) return subject.getAttribute(props[0]);

	var values = {};
	var i = props.length;

	// Return the values in an object for the first matched item
	while (i--) values[props[i]] = subject.getAttribute(props[i]);
	return values;
}
