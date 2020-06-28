/**
 * @memberof $
 * @method offset.set
 *
 * @description
 * Set the offset of an element relative to the document.
 *
 * @param {Object} config The new offset of the element(s).
 *
 * @example
 * $.offset(target).set({top: ..., left: ...});
 * $(target).offset.set({top: ..., left: ...});
 */
function offsetSet(config) {
	const args = this;
	const subject = args[0];
	let i = args[1];

	while (i--) {
		if (config.top || config.left) subject[i].style.position = 'fixed';
		if (config.top) subject[i].style.top = config.top + 'px';
		if (config.left) subject[i].style.left = config.left + 'px';
	}
}
