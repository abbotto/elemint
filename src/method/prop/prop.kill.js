/**
 * @description
 * Remove property (attribute) from an element.
 *
 * @memberof $
 * @method prop/kill
 *
 * @param {Array} prop The property whose value will be removed.
 *
 * @example
 * $.prop(target).kill('property');
 * $(target).prop.kill('property');
 */
function propKill(prp) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	while (i--) subject[i].removeAttribute(prp);
}
