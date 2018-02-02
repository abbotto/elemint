/**
 * @private
 * @param {Array|Node}
 * @return {Array}
 */
function flatten(arr) {
	var i = 0;
	var len = arr.length;
	var result = [];
	var item;

	while (i < len) {
		item = (Array.isArray(arr[i])) ? flatten(arr[i]) : [arr[i]];
		[].push.apply(result, item);
		i += 1;
	}

	return result;
}
