/**
 * @description
 * Set a value on an element property (attribute).
 *
 * @memberof $
 * @method prop/set
 *
 * @param {Object|String} ObjectOrKey Attribute key-pair values or an attribute name.
 * @param {String} value The value that will be set to the property.
 *
 * @example
 * $.prop(target).set('propName', 'value');
 * $(target).prop.set('propName', 'value');
 *
 * $.prop(target).set({'propName1: 'value1', 'propName2: 'value2'};
 * $(target).prop.set({'propName1: 'value1', 'propName2: 'value2'});
 */
function propSet(prp, value) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	var key;

	// Single attribute
	if (typeof value !== 'undefined' && prp.substring) {
		while (i--) {
			// Always use removeAttribute instead of setting the attribute value to null using setAttribute.
			(value.substring()) ? subject[i].setAttribute(prp, value) : subject[i].removeAttribute(prp);
		}
	}
	// Loop through attribute array object containing multiple attributes
	else if (toString(prp) === '[object Object]') {
		while (i--) {
			for (key in prp) {
				if (prp.hasOwnProperty(key)) {
					// Always use removeAttribute instead of setting the attribute value to null using setAttribute.
					(prp[key].substring()) ? subject[i].setAttribute(key, prp[key]) : subject[i].removeAttribute(key);
				}
			}
		}
	}
}
