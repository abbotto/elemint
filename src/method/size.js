/**
 * @memberof $
 * @method $.size
 *
 * @description
 * Get or set the dimensions of an element.
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.size(element);
 */
var size = function size(elements, opt) {
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);
	var key;

	return {
		/**
		 * @memberof $
		 * @method size/set
		 *
		 * @description
		 * Set the height/width of an element.
		 *
		 * @param {Array|Element} subject The element(s) whose dimensions will be set.
		 *
		 * @example
		 *
		 * $.size(element).set(config);
		 * $(selector).size.set(config);
		 */
		set: function (config) {
			while (i--) {
				for (key in config) {
					if (config.hasOwnProperty(key)) {
						if (key === 'width' || key === 'height') {
							elements[i].style[key] = config[key];
						}
					}
				}
			}
		},
		/**
		 * @memberof $
		 * @method size/get
		 *
		 * @description
		 * Get the height/width of an element.
		 *
		 * @param {Array|Element} subject The element(s) whose dimensions will be returned.
		 * @returns {Object} An object containing the element's dimensions.
		 *
		 * @example
		 *
		 * $.size(element).get();
		 * $(selector).size.get();
		 */
		get: function () {
			var container;
			var size;
			var result;
			var output = {};
			var dimensions = (opt instanceof Array) ? opt : ['height', 'width'];

			// Define the element
			if (typeof elements[0] !== 'undefined') {
				for (var n = 0; n < dimensions.length; n += 1) {
					dimensions[n] = dimensions[n][0].toUpperCase() + dimensions[n].slice(1);
					// Window
					if (windowTest(elements[0])) {
						result = Math.max(elements[0]['inner' + dimensions[n]]);
					}
					else {
						// Document/Element
						container = elements[0] || elements[0].body || elements[0].documentElement;
						size = container['offset' + dimensions[n]] || container['scroll' + dimensions[n]] || container['client' + dimensions[n]];
						result = Math.max(size);
					}
					var prop = dimensions[n].toLowerCase();
					output[prop] = result + 'px';
				}
			}
			return output;
		}
	};
};
