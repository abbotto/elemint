/**
 * @memberof $
 * @method watch
 *
 * @description
 * Manage DOM tree node watchers powered by [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 *
 * @param {Node} target The target node(s).
 * @return {Object} methods An object containing the `set` or `void` methods depending on how `$.watch` is called.
 *
 * @example
 * $.watch(target);
 */

function watch(subject) {
	return {
		set: bind(watchSet, subject)
	};
}

watch.void = watchVoid;
