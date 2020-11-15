/**
 * @description
 * Substitute a class on an element's `className` property with another class.
 *
 * @memberof $
 * @method class.swap
 *
 * @param {String} target The class that will be replaced.
 * @param {String} replacement The class that will replace the target class.
 *
 * @example
 * $.class(target).swap('classA', 'classB');
 * $(target).class.swap('classA', 'classB');
 */

function classSwap(classA, classB) {
	let index;
	let names;

	const args = this;
	const subject = args[0];
	let i = args[1];

	while (i--) {
		names = subject[i].className ? subject[i].className.split(' ') : [];

		if (names.length) {
			index = names.indexOf(classA);
			index > -1 && (names[index] = classB);
		} else {
			names.push(classA);
		}

		subject[i].className = names.join(' ');
	}
}
