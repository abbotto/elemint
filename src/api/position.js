/**
 * @memberof $
 * @method position
 *
 * @description
 * Return the position of an element relative to it's offset parent (x, y, z).
 *
 * @param {Element} target The element whose position will be returned.
 * @return {Object} The position of the element returned within an object.
 *
 * @example
 * $.position(target);
 * $(target).position();
 */

function position(subject) {
	return {
		x: subject.offsetLeft,
		y: subject.offsetTop,
		z: layer(subject).get()
	};
}

$$position = function chainPosition() {
	return position(this.$[0]);
};
