/**
 * @private
 * @description
 * - Deep and shallow merges.
 * - Return a new object, preserving all of the original objects and their properties.
 *
 * @param {Objects|Boolean} arguments
 * - The objects to merge together.
 * - Set the first argument to `true` for a deep merge.
 * @return {Object} A new object consisting of all the other objects properties.
 *
 * @example
 * // Merge
 * merge(object1, object2, ...);
 *
 * // Deep merge
 * merge(true, object1, object2, ...);
 */
function merge(objects) {
	// Set some vars
	var args = toArray(arguments);
	var deep = false;
	var key;

	if (typeof args[0] === 'boolean') {
		deep = args.shift();
	}

	var copy = {};
	var len = args.length;
	var i = 0;

	for (; i < len; i += 1) {
		if (!args[i]) {
			continue;
		}

		var keys = Object.keys(args[i]);
		var n = keys.length;

		while (n--) {
			// Deep
			// If a key has another object as its value,
			// the destination object's properties will
			// be mixed in with the source object properties
			// and returned in a new object
			if (deep === true && toString(args[i][key]) === '[object Object]') {
				merge(true, copy[keys[n]], args[i][keys[n]]);
			}
			// Shallow
			// If a key has another object as its value,
			// the destination object's properties will
			// be overridden by the source object properties
			// and returned in a new object
			else copy[keys[n]] = args[i][keys[n]];
		}
	}
	return copy;
}
