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

$$class = {
	set: function chainClassSet(classList) {
		classes($$.fn.$).set(classList);
		return $$.fn;
	},
	swap: function chainClassSwap(classA, classB) {
		classes($$.fn.$).swap(classA, classB);
		return $$.fn;
	},
	void: function chainClassVoid(classList) {
		classes($$.fn.$).void(classList);
		return $$.fn;
	}
};
