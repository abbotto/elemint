/**
 * @memberof $
 * @method layer/get
 *
 * @description
 * Return the z-index of an element.
 *
 * @return {Number} The z-index of the element.
 *
 * @example
 * $.layer(target).get();
 * $(target).layer.get()
 */
function layerGet() {
	var subject = this;

	// Return the current z-index for the first item in the set
	var zIndex = subject.style['z-index'] || window
		.document
		.defaultView
		.getComputedStyle(subject)
		.getPropertyValue('z-index')
	;

	return parseInt(zIndex, 10);
}
