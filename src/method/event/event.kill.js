/**
 * @description
 * Stop an event listener
 *
 * @memberof $
 * @method event/kill
 *
 * @param {Array} tagOrEventName A tag or event name for an existing event
 * @param {Array} callback The original callback function to be used with an event name
 *
 * @example
 * $.event(target).kill('tag');
 * $(target).event.kill('eventName', callback);
 */
function eventKill(tagOrEventName, callback) {
	var args = this;
	var subject = args[0];
	var i = args[1];

	var cancelFn = events.cache[tagOrEventName].callback || callback;

	var evt = callback
		? tagOrEventName
		: events.cache[tagOrEventName].on
	;

	while (i--) subject[i].removeEventListener(evt, bind(cancelFn, subject[i]), 0);
	if (events.cache[tagOrEventName]) delete events.cache[tagOrEventName];
}
