/**
 * @private
 * @description
 * Match an element based on a set of conditions
 *
 * @param {Array}
 * @param {Function}
 * @return {Boolean}
 */

function findMatch(subject, callback) {
	const result = [];
	let i = subject.length;
	i > 0 || ((subject = [subject]), (i = 1));

	while (i--) {
		callback(subject[i]) && result.push(subject[i]);
	}

	return result;
}
