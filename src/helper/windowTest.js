/**
 * @private
 * @description
 * Test if an item is of the type 'window'
 *
 * @param {Object}
 * @returns {Boolean}
 */
function windowTest(obj) {
	return (typeof (window.constructor) === 'undefined') ? obj instanceof window.constructor : obj.window === obj;
}
