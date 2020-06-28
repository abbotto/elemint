/**
 * @memberof $
 * @method unmount
 *
 * @description
 * Unmounting is a process that removes elements from the DOM.
 * Unmount an element or it's relative.
 * - after: Remove the "nextElementSibling" of the subject
 * - before: Remove the "previousElementSibling" of the subject
 * - innerBegin: Remove the "firstChild" of the subject
 * - innerEnd: Remove the "lastChild" of the subject
 * - outerBegin: Remove the "firstChild" sibling within the subject's parent
 * - outerEnd: Remove the "lastChild" sibling within the subject's parent
 *
 * @param {Array|Element} target The point of reference for the mountpoint.
 * @param {Element|String} relative The mountpoint of an element that will be removed relative to the target.
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

function unmount(subject, mountpoint) {
	let i = subject.length || 0;
	i > 0 || ((subject = [subject]), (i = 1));

	let target;
	let parent;

	const mountpointIndex = mountLocationTags.indexOf(mountpoint);

	if (mountpointIndex < 0) {
		target = mountpoint;
	}

	while (i--) {
		if (target) {
			subject[i].removeChild(target);
		} else if (mountpointIndex > -1) {
			parent = subject[i].parentNode || document.documentElement;

			switch (mountpoint) {
				case 'after':
					parent.removeChild(subject[i].nextElementSibling);
					break;
				case 'before':
					parent.removeChild(subject[i].previousElementSibling);
					break;
				case 'innerBegin':
					subject[i].removeChild(subject[i].firstChild);
					break;
				case 'innerEnd':
					subject[i].removeChild(subject[i].lastChild);
					break;
				case 'outerBegin':
					parent.removeChild(parent.firstChild);
					break;
				case 'outerEnd':
					parent.removeChild(parent.lastChild);
					break;
				default:
					throw new Error("Unknown mountpoint: '" + mountpoint + "'.");
			}
		} else {
			subject[i].parentNode.removeChild(subject[i]);
		}
	}
}

$$unmount = function chainUnmount(position, target) {
	unmount(this.$, position, target);
	return this;
};
