/**
 * @memberof $
 * @method parent
 *
 * @description
 * Return the parent of the matched elements.
 *
 * @param {Array|Element} target The element whose parent will be selected.
 * @param {Boolean} offsetParent Find the nearest ancestor that is positioned.
 * @return {Array} The selected parent elements.
 *
 * @example
 * $.parent(target);
 * $.parent(target, true);
 * $(target).parent();
 * $(target).parent(true);
 */

function parent(subject, offsetParent) {
	const result = [];
	let i = subject.length || 0;
	i > 0 || ((subject = [subject]), (i = 1));

	if (offsetParent) {
		let op;

		while (i--) {
			op = subject[i].offsetParent;
			if (op) result.push(op);
		}
	} else while (i--) result.push(subject[i].parentNode);

	return result;
}

$$parent = function chainParent(offsetParent) {
	return $$(parent(this.$, offsetParent));
};
