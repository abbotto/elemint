/**
 * @memberof $
 * @method offset/get
 *
 * @description
 * Return the offset of an element relative to the document.
 *
 * @return {Object} An object containing the element(s) offset as it's properties.
 *
 * @example
 * $.offset(target).get();
 * $(target).offset.get();
 */
function offsetGet() {
	var subject = this;
	var rectangle = subject.getBoundingClientRect();

	return {
		top: rectangle.top + document.body.scrollTop,
		left: rectangle.left + document.body.scrollLeft
	};
}
