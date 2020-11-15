/**
 * @description
 * Manipulate element classes
 *
 * @memberof $
 * @method class
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, void, sub, test' methods.
 *
 * @example
 * $.class(target);
 * $(target).class;
 */

function classes(subject) {
	let len = subject ? subject.length : 0;
	len > 0 || ((subject = [subject]), (len = 1));

	return {
		set: bind(classSet, [subject, len]),
		swap: bind(classSwap, [subject, len]),
		void: bind(classVoid, [subject, len])
	};
}

const $class = {
	set: function chainClassSet(...classNames) {
		classes(elemint.fn.$).set(...classNames);
		return elemint.fn;
	},
	swap: function chainClassSwap(classA, classB) {
		classes(elemint.fn.$).swap(classA, classB);
		return elemint.fn;
	},
	void: function chainClassVoid(...classNames) {
		classes(elemint.fn.$).void(...classNames);
		return elemint.fn;
	}
};
