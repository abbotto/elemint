/**
 * @description
 * Manage element events
 *
 * @memberof $
 * @method $.event
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, kill, emit' methods.
 *
 * @example
 * $.event(target);
 * $(target).event;
 */
var event = function event(subject) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	var methods = {
		emit: bind(eventEmit, [subject, i]),
		kill: bind(eventKill, [subject, i]),
		set: bind(eventSet, [subject, i])
	};

	var emitter = function () {
		this[0].call(subject, this[1]);
	};

	var n = emitList.length;
	while (n--) methods[emitList[n]] = bind(emitter, [methods.emit, emitList[n]]);

	return methods;
};
