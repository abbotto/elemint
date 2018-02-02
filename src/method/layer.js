/**
 * @memberof $
 * @method $.layer
 *
 * @description
 * Manage element layers.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.layer(element);
 */
var layer = function (subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	if (subject[0].nodeType === 1) {
		return {
			/**
			 * @memberof $
			 * @method layer/set
			 *
			 * @description
			 * Set the z-index of an element.
			 *
			 * @param {Number} z-index The new z-index for the element(s).
			 *
			 * @example
			 * $.layer(elements).set(newIndex);
			 * $(selector).layer.set(newIndex)
			 */
			set: function (newIndex) {
				while (i--) subject[i].style['z-index'] = newIndex;
			},
			/**
			 * @memberof $
			 * @method layer/get
			 *
			 * @description
			 * Return the z-index of an element.
			 *
			 * @returns {Number} The z-index of the element.
			 *
			 * @example
			 * $.layer(elements).get(newIndex);
			 * $(selector).layer.get(newIndex)
			 */
			get: function () {
				// Return the current z-index for the first item in the set
				var zIndex = subject[0].style['z-index'] || window
					.document
					.defaultView
					.getComputedStyle(subject[0])
					.getPropertyValue('z-index')
				;

				return parseInt(zIndex, 10);
			}
		};
	}

	throw Error('Not an element');
};
