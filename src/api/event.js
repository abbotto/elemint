/**
 * @description
 * Manage element events
 *
 * @memberof $
 * @method event
 *
 * @param {Array|Element} target The target element(s).
 * @return {Object} methods An object containing the 'set, void, emit' methods.
 *
 * @example
 * $.event(target);
 * $(target).event;
 */

function event(subject) {
	let i = subject.length;
	i > 0 || ((subject = [subject]), (i = 1));

	const emitList = [
		'blur',
		'click',
		'dblclick',
		'focus',
		'keydown',
		'keypress',
		'keyup',
		'mousedown',
		'mouseenter',
		'mouseleave',
		'mousemove',
		'mouseout',
		'mouseover',
		'submit',
		'touchcancel',
		'touchend',
		'touchenter',
		'touchleave',
		'touchmove',
		'touchstart'
	];

	const methods = {
		emit: bind(eventEmit, [subject, i]),
		void: bind(eventVoid, [subject, i]),
		set: bind(eventSet, [subject, i])
	};

	const emitter = function emitterCall() {
		this[0].call(subject, this[1]);
	};

	let n = emitList.length;

	while (n--) {
		methods[emitList[n]] = bind(emitter, [methods.emit, emitList[n]]);
	}

	return methods;
}

const $event = {
	emit: function chainEventEmit(eventName, config) {
		event(elemint.fn.$).emit(eventName, config);
		return elemint.fn;
	},
	set: function chainEventSet(config) {
		event(elemint.fn.$).set(config);
		return elemint.fn;
	},
	void: function chainEventVoid(eventId, callback) {
		event(elemint.fn.$).void(eventId, callback);
		return elemint.fn;
	}
};
