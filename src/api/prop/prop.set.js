/**
 * @description
 * Set a value on an element attribute/property.
 *
 * @memberof $
 * @method prop.set
 *
 * @param {Object|String} ObjectOrKey Attribute key-pair values or an attribute name.
 * @param {String} value The value that will be set to the property.
 *
 * @example
 * $.prop(target).set('propName', 'value');
 * $(target).prop.set('propName', 'value');
 *
 * $.prop(target).set({'propName1: 'value1', 'propName2: 'value2'});
 * $(target).prop.set({'propName1: 'value1', 'propName2: 'value2'});
 */

function propSet(prp, value) {
	const args = this;
	const subject = args[0];
	let i = args[1];

	let key;

	// Use removeAttribute() instead of setting the value to null.
	// Many attributes will not behave as expected if they are set to null.

	// Single attribute
	if (typeof value !== 'undefined' && prp.substring) {
		if (value.substring()) {
			while (i--) {
				if (prp in subject[i]) {
					subject[i].setAttribute(prp, value);
				} else {
					subject[i][prp] = value;
				}
			}
		} else {
			while (i--) {
				subject[i].removeAttribute(prp);
			}
		}
	}
	// Loop through attribute array object containing multiple attributes
	else if (toString(prp) === '[object Object]') {
		while (i--) {
			for (key in prp) {
				if (prp.hasOwnProperty(key)) {
					if (prp[key].substring()) {
						if (key in subject[i]) {
							subject[i].setAttribute(key, prp[key]);
						} else {
							subject[i][key] = prp[key];
						}
					} else {
						subject[i].removeAttribute(key);
					}
				}
			}
		}
	}
}
