/**
 * @memberof $
 * @method $.descend
 *
 * @description
 * Find all the matched descendants at each level of depth relative to the subject.
 * Will return `n` levels of descendants until the limit is reached.
 *
 * @return {Array} An array of descendants that match the given selector.
 * @param {Array|Element} target The parent element(s).
 * @param {String} selectorOrDepth The target descendant or the depth at which the descending will stop.
 * @param {Number} depth The depth at which the descending will stop.
 *
 * @example
 * $.descend(target, optionalSelectorOrDepth, depth);
 * $(target).descend(optionalSelectorOrDepth, depth);
 */
function descend(subject, selector, depth, count) {
	// Initial call - reset the collector
	// The count variable is only used internally
	// when the `descend` function is called recursively
	if (!count) descend.collector = [];

	// Depth was passed in the selector position
	if (parseInt(selector, 10)) {
		depth = selector;
		selector = null;
	}

	var depthCount = count || 0;

	var i = -1;
	var len = subject.length;
	var collectedChildren = [];
	(len > 0) || (subject = [subject], len = 1);

	while ((i += 1) < len) {
		if (subject[i] && (!selector || subject[i].matches(selector))) {
			descend.collector.push(subject[i]);
		}

		var children = subject[i].children;

		if (children && children.length) {
			collectedChildren = collectedChildren.concat(toArray(children));
		}
	}

	i = -1;
	len = collectedChildren.length;
	depthCount += 1;

	while ((i += 1) < len) {
		// Proceed if a depth hasn't been reached or a depth hasn't been set
		// If depth has been set this function will return the children
		// of each descendant until n levels of descendants have been reached
		if (children[i] && (!depth || depthCount <= depth)) {
			descend(
				children[i],
				selector,
				depth,
				depthCount
			);
		}
	}

	return descend.collector;
}
