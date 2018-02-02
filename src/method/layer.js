/**
 * @memberof $
 * @method $.layer
 *
 * @description
 * Manage element layers.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.layer(target);
 * $(target).layer;
 */
var layer = function (subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	if (subject[0].nodeType === 1) {
		return {
			get: bind(layerGet, subject[0]),
			set: bind(layerSet, [subject, i])
		};
	}

	return throwError('Not an element');
};
