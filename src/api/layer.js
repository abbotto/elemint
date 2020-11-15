/**
 * @memberof $
 * @method layer
 *
 * @description
 * Manage element layers via z-Index.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.layer(target);
 * $(target).layer;
 */

function layer(subject) {
	let i = subject.length;
	i > 0 || ((subject = [subject]), (i = 1));

	if (subject[0].nodeType === 1) {
		return {
			get: bind(layerGet, subject[0]),
			set: bind(layerSet, [subject, i])
		};
	}

	throw new Error('Not an element');
}

const $layer = {
	get: function chainLayerGet() {
		return layer(elemint.fn.$).get();
	},
	set: function chainLayerSet(zIndex) {
		layer(elemint.fn.$).set(zIndex);
		return elemint.fn;
	}
};
