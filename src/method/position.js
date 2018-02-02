/**
 * @memberof $
 * @method $.position
 *
 * @description
 * Return the position of an element relative to it's offset parent.
 *
 * @param {Element} target The element whose position will be returned.
 * @return {Object} The position of the element returned within an object.
 *
 * @example
 * $.position(target);
 * $(target).position();
 */
var position = function position(subject) {
	return {
		x: subject.offsetLeft,
		y: subject.offsetTop,
		z: layer(subject).get()
	};
};
