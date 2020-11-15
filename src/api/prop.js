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

const $prop = {
	get: function chainPropGet(...props) {
		return propGet.apply(elemint.fn.$[0], props);
	},
	set: function chainPropSet(property, value) {
		prop(elemint.fn.$).set(property, value);
		return elemint.fn;
	},
	test: function chainPropTest(property) {
		return propTest.apply(elemint.fn.$[0], property);
	},
	void: function chainPropVoid(property) {
		prop(elemint.fn.$).void(property);
		return elemint.fn;
	}
};
