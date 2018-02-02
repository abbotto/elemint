/**
 * @memberof $
 * @method $.offset
 *
 * @description
 * Manage element offsets.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.offset(element);
 */
var offset = function offset(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	return {
		/**
		 * @memberof $
		 * @method offset/set
		 *
		 * @description
		 * Set the offset of an element relative to the document.
		 *
		 * @param {Object} settings The new offset of the element(s).
		 *
		 * @example
		 * $.offset(elements).set({top: ..., left: ...});
		 * $(selector).offset.set({top: ..., left: ...});
		 */
		set: function (value) {
			while (i--) {
				if (value.top || value.left) subject[i].style.position = 'fixed';
				if (value.top) subject[i].style.top = value.top + 'px';
				if (value.left) subject[i].style.left = value.left + 'px';
			}
		},
		/**
		 * @memberof $
		 * @method offset/get
		 *
		 * @description
		 * Return the offset of an element relative to the document.
		 *
		 * @returns {Object} An object containing the element(s) offset as it's properties.
		 *
		 * @example
		 * $.offset(elements).get();
		 * $(selector).offset.get();
		 */
		get: function () {
			var rectangle = subject[0].getBoundingClientRect();
			return {
				top: rectangle.top + document.body.scrollTop,
				left: rectangle.left + document.body.scrollLeft
			};
		}
	};
};
