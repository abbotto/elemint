/**
 * @memberof $
 * @method $.mount
 *
 * @description
 * - Mounting is a process that inserts elements into the DOM.
 * - Mount an element or fragment in a parent element.
 * - Will default to mounting the selected element(s) in `document.body` if no other arguments are passed.
 *     - innerEnd: `afterend` of subject's last child.
 *     - innerBegin: `beforebegin` of subject's first child.
 *     - outerEnd: `afterend` of subject's last sibling.
 *     - outerBegin: `beforebegin` of subject's first sibling.
 *     - before: `beforebegin` of subject.
 *     - after: `afterend` of subject.
 *
 * @param {Element|Fragment} target The point of reference for the mountpoint location.
 * @param {Array|Element|Fragment|String|Undefined} locationOrPayload
 * The mountpoint location relative to the target or the payload elements with the default mountpoint location set to `innerEnd`.
 * @param {Array|Element|Fragment|String|Undefined} payload The payload elements that will be mounted.
 *
 * @example
 * $.mount(
 *     target,
 *     locationOrPayload,
 *     payload
 * );
 *
 * $(target).mount(
 *     locationOrPayload,
 *     payload
 * );
 */
var mount = function mount(subject, location, payload) {
	var i = subject.length || 0;
	(i > 0) || (subject = [subject], i = 1);
	var n = -1;

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

	if (locationTags.indexOf(location) < 0) {
		payload = location;
		location = false;
	}

	if (payload && payload.substring) {
		frag = document.createDocumentFragment();
		wrapper.innerHTML = payload;
		while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
		payload = frag;
	}

	if (!payload && !location) {
		while ((n += 1) < i) document.body.appendChild(subject[n]);
	}
	else if (!location) {
		while (i--) {
			while (subject[i].lastChild) subject[i].removeChild(subject[i].lastChild);
			subject[i].appendChild(payload);
		}
	}
	else {
		while (i--) {
			parent = subject[i].parentNode || document.documentElement;

			/* eslint-disable indent */
			// `afterend` of subject's lastChild
			location === 'innerEnd'
				? subject[i].appendChild(payload)
			// `beforebegin` of subject's firstChild
			: location === 'innerBegin'
				? subject[i].insertBefore(payload, subject[i].firstChild)
			// `afterend` of subject's lastSibling
			: location === 'outerEnd'
				? parent.appendChild(payload)
			// `beforebegin` of subject's firstSibling
			: location === 'outerBegin'
				? parent.insertBefore(payload, parent.firstChild)
			// `beforebegin` of subject
			: location === 'before'
				? parent.insertBefore(payload, subject[i])
			// `afterend` of subject
			: location === 'after'
				? parent.insertBefore(payload, subject[i].nextElementSibling)
				: throwError('Unknown location: ' + location)
			;
		}
	}
};
