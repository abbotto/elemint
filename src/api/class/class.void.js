/**
 * @description
 * Disable a class on an element's `className` property.
 *
 * @memberof $
 * @method class.void
 *
 * @param {String} classes The classnames to be disabled.
 *
 * @example
 * $.class(target).void(classA, classB, classN, ...);
 * $(target).class.void(classA, classB, classN, ...);
 */
function classVoid(...names) {
	let n;
	let index;
	let cNames;

	const namesLen = names.length;
	const args = this;
	const subject = args[0];

	let i = args[1];

	while (i--) {
		if (subject[i].className) {
			n = namesLen;
			cNames = subject[i].className.split(' ');

			while (n--) {
				index = cNames.indexOf(names[n]);
				index > -1 && cNames.splice(index, 1);
			}

			subject[i].className = cNames.join(' ');
		}
	}
}
