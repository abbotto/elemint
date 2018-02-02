/**
 * @description
 * Disable a class on an element's `className` property.
 *
 * @memberof $
 * @method class/kill
 *
 * @param {String} classes The classnames to be disabled.
 *
 * @example
 * $.class(target).kill(classA, classB, classN, ...);
 * $(target).class.kill(classA, classB, classN, ...);
 */
function classKill() {
	var n;
	var index;
	var cNames;
	var names = toArray(arguments);
	var namesLen = names.length;

	var args = this;
	var subject = args[0];
	var i = args[1];

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
