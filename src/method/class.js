/**
 * @description
 * Manipulate element classes
 *
 * @memberof $
 * @method $.class
 *
 * @param {Array|Element} subject The target element(s).
 * @return {Object} props An object containing the 'set, kill, sub, test' methods.
 *
 * @example
 * $.class(element);
 */
var classes = function classes(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	return {
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
		 * $.class(element).set(classA, classB, classN, ...);
		 * $(selector).class.set(classA, classB, classN, ...);
		 */
		set: function classSet() {
			var n;
			var cNames;
			var names = toArray(arguments);
			var namesLen = names.length;

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
		},
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
		 * $.class(element).kill(classA, classB, classN, ...);
		 * $(selector).class.kill(classA, classB, classN, ...);
		 */
		kill: function classKill() {
			var n;
			var index;
			var cNames;
			var names = toArray(arguments);
			var namesLen = names.length;

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
		},
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
		 * $.class(element).sub('classA', 'classB');
		 * $(selector).class.sub('classA', 'classB');
		 */
		sub: function classSub(classA, classB) {
			var n;
			var index;
			var cNames;

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
		},
		/**
		 * @description
		 * Check if a class exists on an element's `className` property.
		 *
		 * @memberof $
		 * @method class/test
		 *
		 * @param {String} target The class that will be tested.
		 * @return {Boolean}
		 *
		 * @example
		 * $.class(element).test('className');
		 * $(selector).class.test('className');
		 */
		test: function classTest(className) {
			return subject[0].className.indexOf(className) > -1;
		}
	};
};
