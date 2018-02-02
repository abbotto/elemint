/**
 * @memberof $
 * @method size/set
 *
 * @description
 * Set the height/width of an element.
 *
 * @param {Array|Element} target The element(s) whose dimensions will be set.
 *
 * @example
 *
 * $.size(target).set(config);
 * $(target).size.set(config);
 */
function sizeSet(config) {
	var key;
	var args = this;
	var subject = args[0];
	var i = args[1];

	while (i--) {
		for (key in config) {
			if (config.hasOwnProperty(key)) {
				if (key === 'width' || key === 'height') {
					subject[i].style[key] = config[key];
				}
			}
		}
	}
}
