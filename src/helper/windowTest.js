/**
 * @private
 * @param {Object}
 * @return {Boolean}
 */
function windowTest(obj) {
	return (typeof (window.constructor) === 'undefined') ? obj instanceof window.constructor : obj.window === obj;
}
