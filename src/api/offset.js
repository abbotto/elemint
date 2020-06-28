/**
 * @memberof $
 * @method offset
 *
 * @description
 * Manage element offsets.
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, get' methods.
 *
 * @example
 * $.offset(target);
 * $(target).offset;
 */

function offset(subject) {
	let i = subject.length;
	i > 0 || ((subject = [subject]), (i = 1));

	return {
		get: bind(offsetGet, subject[0]),
		set: bind(offsetSet, [subject, i])
	};
}

$$offset = {
	get: function chainOffsetGet() {
		return offset($$.fn.$).get();
	},
	set: function chainOfsetSet(config) {
		offset($$.fn.$).set(config);
		return $$.fn;
	}
};
