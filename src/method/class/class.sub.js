/**
 * @description
 * Substitute a class on an element's `className` property with another class.
 *
 * @memberof $
 * @method class/sub
 *
 * @param {String} target The class that will be replaced.
 * @param {String} replacement The class that will replace the target class.
 *
 * @example
 * $.class(target).sub('classA', 'classB');
 * $(target).class.sub('classA', 'classB');
 */
function classSub(classA, classB) {
	var n;
	var index;
	var cNames;

	var args = this;
	var subject = args[0];
	var i = args[1];

	while (i--) {
		cNames = subject[i].className
			? subject[i].className.split(' ')
			: []
		;

		if (cNames.length) {
			index = cNames.indexOf(classA);
			index > -1 && (cNames[index] = classB);
		}
		else cNames.push(classA);

		subject[i].className = cNames.join(' ');
	}
}
