/**
 * @memberof $
 * @method $.remove
 *
 * @description
 * Remove elements from the DOM
 * - innerEnd: `afterend` of subject's last child
 * - innerBegin: `beforebegin` of subject's first child
 * - outerEnd: `afterend` of subject's last sibling
 * - outerBegin: `beforebegin` of subject's first sibling
 * - before: `beforebegin` of subject
 * - after: `afterend` of subject
 *
 * @param {Array|Element} subject The element(s) to remove OR the element(s) whose relatives will be removed.
 * @param {String} relative The relative to be removed.
 *
 * @example
 * // Self
 * $.remove(elements);
 * $(selector).remove();
 *
 * // Relative
 * $.remove(elements, location);
 * $(selector).remove(location);
 */
var remove = function remove(elements, location) {
	var locationTags = ['before', 'after', 'outerBegin', 'outerEnd', 'innerBegin', 'innerEnd'];
	var i = elements.length || 0;
	(i > 0) || (elements = [elements], i = 1);

	while (i--) {
		/* eslint-disable indent */
		if (locationTags.indexOf(location) > -1) {
			location === 'before'
				? elements[i].parentNode.removeChild(elements[i].previousElementSibling)
			: location === 'after'
				? elements[i].parentNode.removeChild(elements[i].nextElementSibling)
			: location === 'outerBegin'
				? elements[i].parentNode.removeChild(elements[i].parentNode.firstChild)
			: location === 'outerEnd'
				? elements[i].parentNode.removeChild(elements[i].parentNode.lastChild)
			: location === 'innerBegin'
				? elements.removeChild(elements[i].firstChild)
			: location === 'innerEnd'
				? elements.removeChild(elements[i].lastChild)
				: throwError('Unknown position')
			;
		}
		else if (location === 'inner') {
			while (elements.lastChild) elements[i].removeChild(elements[i].lastChild);
		}
		else elements[i].parentNode.removeChild(elements[i]);
	}
};
