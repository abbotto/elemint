/**
 * @private
 * @param {String}
 * @return {String}
 */
function camelize(str) {
	return str.replace(reCamelize, function (match, chr) {
		return chr ? chr.toUpperCase() : '';
	});
}
