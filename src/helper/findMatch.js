/**
 * @private
 * @param {Array} subject
 * @param {Function} callback
 * @return {Array} result
 */
function findMatch(subject, callback) {
	var result = [];
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	while (i--) callback(subject[i]) && result.push(subject[i]);
	return result;
}
