/**
 * @description
 * Enable a class on an element's `className` property.
 *
 * @memberof $
 * @method class/set
 *
 * @param {String} classes The classnames to be enabled.
 *
 * @example
 * $.class(target).set(classA, classB, classN, ...);
 * $(target).class.set(classA, classB, classN, ...);
 */
function classSet() {
	var n;
	var cNames;
	var names = toArray(arguments);
	var namesLen = names.length;

	var args = this;
	var subject = args[0];
	var i = args[1];

	while (i--) {
		if (!subject[i].className) subject[i].className = names.join(' ');
		else {
			cNames = subject[i].className
				? subject[i].className.split(' ')
				: []
			;

			n = namesLen;
			while (n-- && cNames.indexOf(names[n]) < 1) cNames.push(names[n]);
			subject[i].className = cNames.join(' ');
		}
	}
}
