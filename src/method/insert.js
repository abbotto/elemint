/**
 * @memberof $
 * @method $.insert
 *
 * @description
 * Insert html/nodes into the DOM:
 * - innerEnd: `afterend` of subject's last child.
 * - innerBegin: `beforebegin` of subject's first child.
 * - outerEnd: `afterend` of subject's last sibling.
 * - outerBegin: `beforebegin` of subject's first sibling.
 * - before: `beforebegin` of subject.
 * - after: `afterend` of subject.
 *
 * @param {Array|Element} subject The parent element(s).
 * @param {String} position The position of the new node(s).
 * @param {Element|DocumentFragment|String} node The node(s) that will be inserted.
 *
 * @example
 * $.insert(subject, position, content);
 */
var insert = function insert(subject, position, content) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);

	var locationTags = [
		'after',
		'before',
		'innerBegin',
		'innerEnd',
		'outerBegin',
		'outerEnd'
	];

	var node;
	var frag;
	var parent;

	if (locationTags.indexOf(position) < 0) {
		content = position;
		position = false;
	}

	if (content.substring) {
		frag = document.createDocumentFragment();
		wrapper.innerHTML = content;
		while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
		content = frag;
	}

	if (!position) {
		while (i--) {
			while (subject[i].lastChild) subject[i].removeChild(subject[i].lastChild);
			subject[i].appendChild(content);
		}
	}
	else {
		while (i--) {
			parent = subject[i].parentNode || document.documentElement;

			/* eslint-disable indent */
			// `afterend` of subject's lastChild
			position === 'innerEnd'
				? subject[i].appendChild(content)
			// `beforebegin` of subject's firstChild
			: position === 'innerBegin'
				? subject[i].insertBefore(content, subject[i].firstChild)
			// `afterend` of subject's lastSibling
			: position === 'outerEnd'
				? parent.appendChild(content)
			// `beforebegin` of subject's firstSibling
			: position === 'outerBegin'
				? parent.insertBefore(content, parent.firstChild)
			// `beforebegin` of subject
			: position === 'before'
				? parent.insertBefore(content, subject[i])
			// `afterend` of subject
			: position === 'after'
				? parent.insertBefore(content, subject[i].nextElementSibling)
				: throwError('Unknown position')
			;
		}
	}
};
