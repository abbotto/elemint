/**
 * @memberof $
 * @method fragment
 *
 * @description
 * Wrap HTML/nodes in a document fragment.
 *
 * @param {String|Element|Array} contents The html/elements that will be wrapped.
 * @return {Fragment} The html/elements wrapper.
 *
 * @example
 * $.fragment([el1, el2, el3, ...]);
 * $.fragment("<div>...</div>");
 */

function fragment(subject) {
	let frag;

	if (subject.substring) {
		frag = document.createRange().createContextualFragment(subject);
	} else {
		frag = document.createDocumentFragment();

		let len = subject.length;
		len > 0 || ((subject = [subject]), (len = 1));

		let i = 0;

		for (; i < len; i += 1) {
			frag.appendChild(subject[i]);
		}
	}

	return frag;
}
