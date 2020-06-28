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
	let cNames;

	const args = this;
	const subject = args[0];
	let i = args[1];

	while (i--) {
		cNames = subject[i].className ? subject[i].className.split(' ') : [];

		if (cNames.length) {
			index = cNames.indexOf(classA);
			index > -1 && (cNames[index] = classB);
		} else {
			cNames.push(classA);
		}

		subject[i].className = cNames.join(' ');
	}
}
