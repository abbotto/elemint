/**
 * @memberof $
 * @method $.unmount
 *
 * @description
 * Unmounting is a process that removes elements from the DOM.
 * Unmount an element or it's relative.
 * - innerEnd: `afterend` of subject's last child
 * - innerBegin: `beforebegin` of subject's first child
 * - outerEnd: `afterend` of subject's last sibling
 * - outerBegin: `beforebegin` of subject's first sibling
 * - before: `beforebegin` of subject
 * - after: `afterend` of subject
 *
 * @param {Array|Element} target The point of reference for the mountpoint location.
 * @param {Element|String} relative The location of an element that will be removed relative to the target.
 *
 * @example
 * // Self
 * $.unmount(target);
 * $(target).unmount();
 *
 * // Relatives
 * $.unmount(target, relativeLocation);
 * $(target).unmount(relativeLocation);
 * $.unmount(target, childElement);
 * $(target).unmount(childElement);
 */
var unmount = function unmount(subject, location) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	var target;
	var locationIndex = [
		'before',
		'after',
		'outerBegin',
		'outerEnd',
		'innerBegin',
		'innerEnd'
	].indexOf(location);

	if (locationIndex < 0) target = location;

	while (i--) {
		/* eslint-disable indent */
		if (target) subject[i].removeChild(target);
		else if (locationIndex > -1) {
			location === 'before'
				? subject[i].parentNode.removeChild(subject[i].previousElementSibling)
			: location === 'after'
				? subject[i].parentNode.removeChild(subject[i].nextElementSibling)
			: location === 'outerBegin'
				? subject[i].parentNode.removeChild(subject[i].parentNode.firstChild)
			: location === 'outerEnd'
				? subject[i].parentNode.removeChild(subject[i].parentNode.lastChild)
			: location === 'innerBegin'
				? subject[i].removeChild(subject[i].firstChild)
			: location === 'innerEnd'
				? subject[i].removeChild(subject[i].lastChild)
				: throwError('Unknown position: \'' + location + '\'.')
			;
		}
		else subject[i].parentNode.removeChild(subject[i]);
	}
};
