/**
 * @private
 * @description
 * Convert strings to `camelCase` format
 *
 * @param {String}
 * @return {Boolean}
 */

function camelize(str) {
	return str.replace(/(?:^|[-])(\w)/g, (match, chr) => {
		return chr ? chr.toUpperCase() : '';
	});
}
