/**
 * @private
 * @param {Array|Element} subject
 * @return {Function} callback
 */
function loop(subject, callback) {
	var i = 0;
	var len = subject.length;
	(len > 0) || (subject = [subject], len = 1);

	for (; i < len; i += 1) {
		return callback(subject[i], i);
	}
}
