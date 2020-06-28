/**
 * @description
 * Enable a class on an element's `className` property.
 *
 * @memberof $
 * @method class.set
 *
 * @param {String} classes The classnames to be enabled.
 *
 * @example
 * $.class(target).set(classA, classB, classN, ...);
 * $(target).class.set(classA, classB, classN, ...);
 */
function classSet(...names) {
	let n;
	let cNames;

	const namesLen = names.length;
	const args = this;
	const subject = args[0];

	let i = args[1];

	while (i--) {
		if (!subject[i].className) subject[i].className = names.join(' ');
		else {
			cNames = subject[i].className ? subject[i].className.split(' ') : [];

			n = namesLen;
			while (n-- && cNames.indexOf(names[n]) < 1) cNames.push(names[n]);
			subject[i].className = cNames.join(' ');
		}
	}
}
