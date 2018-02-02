/**
 * @memberof $
 * @method $.parent
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
var parent = function parent(subject, offsetParent) {
	var result = [];
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	if (offsetParent) {
		var op;

		while (i--) {
			op = subject[i].offsetParent;
			if (op) result.push(op);
		}
	}
	else while (i--) result.push(subject[i].parentNode);

	return result;
};
