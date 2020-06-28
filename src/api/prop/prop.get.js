/**
 * @description
 * Get a value from an element attribute/property.
 *
 * @memberof $
 * @method prop.get
 *
 * @param {String} prop A comma-separated list of attributes whose value(s) will be fetched.
 * @return {Object|String} prop An object with attribute key-value pairs or a single value string.
 *
 * @example
 * $.prop(target).get('property');
 * $.prop(target).get('propertyA', 'propertyB');
 * $(target).prop.get('property');
 * $(target).prop.get('propertyA', 'propertyB');
 */

function propGet(...props) {
	const subject = this;

	// Return a single property for the first matched item
	if (props.length === 1) {
		return subject.getAttribute(props[0]) || subject[props[0]];
	}

	const values = {};
	let i = props.length;

	// Return the values in an object for the first matched item
	while (i--) {
		values[props[i]] = subject.getAttribute(props[i]) || subject[props[i]];
	}

	return values;
}
