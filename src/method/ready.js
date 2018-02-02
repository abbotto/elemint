/**
 * @memberof $
 * @method $.ready
 *
 * @description
 * Execute a function when the DOM is ready.
 *
 * @param {Function} callback A callback function.
 *
 * @example
 * $.ready(() => {
 *     // body...
 * });
 */
var ready = function ready(context, callback) {
	if (typeof context === 'function') {
		callback = context;
		context = document;
	}

	context.readyState === 'complete'
		|| context.readyState === 'loaded'
		|| (!(window.ActiveXObject || 'ActiveXObject' in window) && context.readyState === 'interactive')
		? callback.call(context)
		: context.addEventListener('DOMContentLoaded', bind(callback, context), 0)
	;
};
