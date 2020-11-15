/**
 * @description
 * Disable a class on an element's `className` property.
 *
 * @memberof $
 * @method class.void
 *
 * @param {String} classes The classclassNames to be disabled.
 *
 * @example
 * $.class(target).void(classA, classB, classN, ...);
 * $(target).class.void(classA, classB, classN, ...);
 */

function classVoid(...classNames) {
	let n;
	let index;
	let names;

	const classNamesLen = classNames.length;
	const args = this;
	const subject = args[0];

	let i = args[1];

	while (i--) {
		if (subject[i].className) {
			n = classNamesLen;
			names = subject[i].className.split(' ');

			while (n--) {
				index = names.indexOf(classNames[n]);

				if (index > -1) {
					names.splice(index, 1);
				}
			}

			subject[i].className = names.join(' ');
		}
	}
}
