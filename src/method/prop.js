/**
 * @memberof $
 * @method $.prop
 *
 * @description
 * Manage element properties (attributes)
 *
 * @param {Array|Element} subject The target element(s)
 * @return {Object} props An object containing the 'set, get, kill' methods
 *
 * @example
 * $.prop(element);
 */
var prop = function (subject) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	return {
		/**
		 * @description
		 * Set a value on an element property (attribute).
		 *
		 * @memberof $
		 * @method prop/set
		 *
		 * @param {Array} prop The property whose value will be set.
		 * @param {Array} value The value that will be set to the property.
		 *
		 * @example
		 * $.prop(element).set('propName', 'value');
		 * $(selector).prop.set('propName', 'value');
		 */
		set: function propSet(prp, value) {
			var key;

			// Single attribute
			if (typeof value !== 'undefined' && !!prp.substring) {
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
		},

		/**
		 * @description
		 * Get a value from an element property (attribute).
		 *
		 * @memberof $
		 * @method prop/get
		 *
		 * @param {String} prop The property or properties whose value(s) will be fetched.
		 *
		 * @example
		 * $.prop(element).get('property');
		 * $(selector).prop.get('property');
		 */
		get: function propGet() {
			var prp = toArray(arguments);

			// Pass an array of attributes and return the values in an object for the first matched item
			if (prp.length === 1) return subject[0].getAttribute(prp[0]);
			var values = {};
			var n = 0;
			i += 1;

			for (; n < i; n += 1) {
				for (var x = 0; x < prp.length; x += 1) {
					values[prp[x]] = prop(subject[n]).get(prp[x]);
				}
				return values;
			}
		},

		/**
		 * @description
		 * Remove property (attribute) from an element.
		 *
		 * @memberof $
		 * @method prop/kill
		 *
		 * @param {Array} prop The property whose value will be removed.
		 *
		 * @example
		 * $.prop.kill('property');
		 * $(selector).prop.kill('property');
		 */
		kill: function propKill(prp) {
			while (i--) subject[i].removeAttribute(prp);
		}
	};
};
