/**
 * @memberof $
 * @method mount
 *
 * @description
 * - Mounting is a process that inserts elements into the DOM.
 * - Mount an element or fragment in a parent element.
 * - Will default to mounting the selected element(s) in `document.body` if no other arguments are passed.
 *     - after: Append a sibling after the subject
 *     - before: Append a sibling before the subject
 *     - innerBegin: Append a new `firstChild` within the subject
 *     - innerEnd: Append a new `lastChild` within the subject
 *     - outerBegin: Append a new `firstChild` sibling within the subject's parent
 *     - outerEnd: Append a new `lastChild` sibling within the subject's parent
 *
 * @param {Element|Fragment} target The point of reference for the mount location.
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

const mountLocationTags = [
	'after',
	'before',
	'innerBegin',
	'innerEnd',
	'outerBegin',
	'outerEnd'
];

function mount(subject, mountpoint, payload) {
	let i = subject.length || 0;
	i > 0 || ((subject = [subject]), (i = 1));

	let n = -1;
	let parent;

	if (mountLocationTags.indexOf(mountpoint) < 0) {
		payload = mountpoint;
		mountpoint = false;
	}

	if (payload && payload.substring) {
		payload = document.createRange().createContextualFragment(payload);
	}

	if (!payload && !mountpoint) {
		while ((n += 1) < i) {
			document.body.appendChild(subject[n]);
		}
	} else if (!mountpoint) {
		while (i--) {
			while (subject[i].lastChild) subject[i].removeChild(subject[i].lastChild);
			subject[i].appendChild(payload);
		}
	} else {
		while (i--) {
			parent = subject[i].parentNode || document.documentElement;

			switch (mountpoint) {
				case 'after':
					parent.insertBefore(payload, subject[i].nextElementSibling);
					break;
				case 'before':
					parent.insertBefore(payload, subject[i]);
					break;
				case 'innerBegin':
					subject[i].insertBefore(payload, subject[i].firstChild);
					break;
				case 'innerEnd':
					subject[i].appendChild(payload);
					break;
				case 'outerBegin':
					parent.insertBefore(payload, parent.firstChild);
					break;
				case 'outerEnd':
					parent.appendChild(payload);
					break;
				default:
					throw new Error('Unknown mountpoint: ' + mountpoint);
			}
		}
	}
}

const $mount = function chainMount(position, payload) {
	mount(this.$, position, payload);
	return this;
};
