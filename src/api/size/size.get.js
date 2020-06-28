/**
 * @memberof $
 * @method size.get
 *
 * @description
 * Get the height/width of an element.
 *
 * @param {String} heightOrWidth Specify a single dimension to return.
 * @return {Object} An object containing the element's dimensions.
 *
 * @example
 *
 * $.size(target).get();
 * $.size(target).get('height');
 * $(target).size.get();
 * $(target).size.get('height');
 */

function sizeGet(opt) {
	let context;
	let size;
	let result;

	const output = {};
	const props = ['height', 'width'];
	const xy = props.indexOf(opt) > -1 ? [opt] : props;
	const subject = this;

	if (typeof subject !== 'undefined') {
		let n = 0;

		for (; n < xy.length; n += 1) {
			// Rename to 'Height' or 'Width'
			xy[n] = xy[n][0].toUpperCase() + xy[n].slice(1);

			// Window
			if (subject === window) {
				result = Math.max(subject['inner' + xy[n]]);
			} else {
				context = subject.body || subject.documentElement || subject;
				size = context['offset' + xy[n]];
				context['scroll' + xy[n]] || context['client' + xy[n]];
				result = Math.max(size);
			}
			const prop = xy[n].toLowerCase();
			output[prop] = result + 'px';
		}
	}
	return output;
}
