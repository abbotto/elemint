/**
 * @memberof $
 * @method watch.void
 *
 * @description
 * Void a DOM watcher.
 *
 * @param {String} tag Watcher identification.
 *
 * @example
 * $.watch.void(tag);
 */

function watchVoid(tag) {
	const isJob = !!watchers.job[tag];
	watchers.job[tag].disconnect();
	delete watchers.job[tag];
	return isJob;
}
