/**
 * @private
 * @param {Array|Node}
 * @returns {Array}
 */
function flatten(arr) {
	var i = 0,
		len = arr.length,
		result = [],
		item;
	while (i < len) {
		item = (Array.isArray(arr[i])) ? flatten(arr[i]) : [arr[i]];
		[].push.apply(result, item);
		i += 1;
	}
	return result;
}
