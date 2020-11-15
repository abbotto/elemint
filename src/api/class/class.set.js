/**
 * @description
 * Enable a class on an element's `className` property.
 *
 * @memberof $
 * @method class.set
 *
 * @param {String} classes The classNames to be enabled.
 *
 * @example
 * $.class(target).set(classA, classB, classN, ...);
 * $(target).class.set(classA, classB, classN, ...);
 */

function classSet(...classNames) {
	let n;
	let names;

	const classNamesLen = classNames.length;
	const args = this;
	const subject = args[0];

	let i = args[1];

	while (i--) {
		if (!subject[i].className) {
			subject[i].className = classNames.join(' ');
		} else {
			names = subject[i].className ? subject[i].className.split(' ') : [];

			n = classNamesLen;
			while (n-- && names.indexOf(classNames[n]) < 1) names.push(classNames[n]);
			subject[i].className = names.join(' ');
		}
	}
}
