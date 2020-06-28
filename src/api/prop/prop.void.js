/**
 * @description
 * Remove an attribute/property value from an element.
 *
 * @memberof $
 * @method prop.void
 *
 * @param {Array} prop The property whose value will be removed.
 *
 * @example
 * $.prop(target).void('property');
 * $(target).prop.void('property');
 */

function propVoid(prp) {
	const args = this;
	const subject = args[0];
	let i = args[1];

	while (i--) {
		if (prp in subject[i]) {
			subject[i].removeAttribute(prp);
		} else {
			delete subject[i][prp];
		}
	}
}
