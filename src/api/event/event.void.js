/**
 * @description
 * Stop an event listener
 *
 * @memberof $
 * @method event.void
 *
 * @param {Array} tagOrEventName A tag or event name for an existing event
 * @param {Array} callback The original callback function to be used with an event name
 *
 * @example
 * $.event(target).void('tag');
 * $(target).event.void('eventName', callback);
 */

function eventVoid(tagOrEventName, callback) {
	const args = this;
	const subject = args[0];
	let i = args[1];

	const cancelFn = events.job[tagOrEventName].callback || callback;
	const evt = callback ? tagOrEventName : events.job[tagOrEventName].on;

	while (i--) subject[i].removeEventListener(evt, bind(cancelFn, subject[i]), 0);

	if (events.job[tagOrEventName]) {
		delete events.job[tagOrEventName];
	}
}
