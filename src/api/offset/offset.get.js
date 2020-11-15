/**
 * @memberof $
 * @method offset.get
 *
 * @param {Boolean} offsetParent Returns the distance of an element relative to the top of the offsetParent node.
 *
 * @description
 * Return the offset of an element relative to the document or offsetParent node.
 *
 * @return {Object} An object containing the element(s) offset values.
 *
 * @example
 * $.offset(target).get();
 * $(target).offset.get();
 */

function offsetGet(offsetParent) {
	const subject = this;

	if (offsetParent === true) {
		return {
			top: subject.offsetTop,
			left: subject.offsetLeft
		};
	}

	const rectangle = subject.getBoundingClientRect();
	const body = document.body;

	return {
		top: rectangle.top + (window.pageYOffset || body.scrollTop),
		left: rectangle.left + (window.pageXOffset || body.scrollLeft)
	};
}
