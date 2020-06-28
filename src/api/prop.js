/**
 * @memberof $
 * @method prop
 *
 * @description
 * Manage element properties
 *
 * @param {Array|Element} target The target element(s)
 * @return {Object} methods An object containing the 'set, get, void' methods
 *
 * @example
 * $.prop(target);
 * $(target).prop;
 */

function prop(subject) {
	let i = subject.length || 0;
	i > 0 || ((subject = [subject]), (i = 1));

	return {
		get: bind(propGet, subject[0]),
		void: bind(propVoid, [subject, i]),
		set: bind(propSet, [subject, i]),
		test: bind(propTest, subject[0])
	};
}

$$prop = {
	get: function chainPropGet() {
		return propGet.apply($$.fn.$[0], arguments);
	},
	set: function chainPropSet(prp, value) {
		prop($$.fn.$).set(prp, value);
		return $$.fn;
	},
	test: function chainPropTest(prp) {
		return propTest.apply($$.fn.$[0], prp);
	},
	void: function chainPropVoid(prp) {
		prop($$.fn.$).void(prp);
		return $$.fn;
	}
};
