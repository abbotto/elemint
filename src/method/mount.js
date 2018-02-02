/**
 * @memberof $
 * @method $.mount
 *
 * @description
 * - Mount an element's children or a fragment into the DOM.
 * - Clears both the element or fragment and the mountpoint before mounting the nodes.
 * - If the `preserve` boolean is passed, the mountpoint won't be cleared.
 *
 * @param {Element} destination A new container that will hold the new nodes.
 * @param {Element|Fragment} source An existing container whose elements will be mounted.
 * @param {Boolean} preserve Keep any existing nodes in the destination and append new nodes.
 * @return {Element} mountpoint The element containing the new nodes.
 *
 * @example
 * $.mount(destination, source);
 */
var mount = function mount(dest, src, preserve) {
	if (!preserve) while (dest.lastChild) dest.removeChild(dest.lastChild);
	if (src.nodeType === 11) dest.appendChild(src);
	else while (src.firstChild) dest.appendChild(src.firstChild);
	return dest;
};
