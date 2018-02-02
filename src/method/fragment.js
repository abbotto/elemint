/**
 * @memberof $
 * @method $.fragment
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
var fragment = function fragment(subject) {
	var frag = document.createDocumentFragment();

	if (subject.substring) {
		wrapper.innerHTML = subject;
		while (firstChild = wrapper.firstChild) frag.appendChild(firstChild);
	}
	else {
		var i = subject.length;
		(i > 0) || (subject = [subject], i = 1);
		var n = 0;
		for (; n < i; n += 1) frag.appendChild(subject[n]);
	}

	return frag;
};
