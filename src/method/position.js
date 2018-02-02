/**
 * @memberof $
 * @method $.position
 *
 * @description
 * Return the position of an element relative to it's offset parent.
 *
 * @param {Element} subject The element whose position will be returned.
 * @returns {Object} The position of the element returned within an object.
 *
 * @example
 * $.position(element);
 * $(selector.position();
 */
var position = function position(subject) {
	return {
		x: subject.offsetLeft,
		y: subject.offsetTop,
		z: layer(subject).get()
	};
};
