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
 * $.layer(target).set(newIndex);
 * $(target).layer.set(newIndex)
 */
function layerSet(newIndex) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	while (i--) subject[i].style['z-index'] = newIndex;
}
