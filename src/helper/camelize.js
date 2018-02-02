/**
 * @private
 * @param {String}
 * @return {String}
 */
function camelize(string) {
	return string.replace(reCamelize, function (c) { (c ? c.toUpperCase() : ''); });
}
