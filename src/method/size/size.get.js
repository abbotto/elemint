/**
 * @memberof $
 * @method size/get
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
	var context;
	var size;
	var result;
	var output = {};
	var props = ['height', 'width'];
	var xy = props.indexOf(opt) > -1 ? [opt] : props;
	var subject = this;

	// Define the element
	if (typeof subject !== 'undefined') {
		for (var n = 0; n < xy.length; n += 1) {
			// Rename to 'Height' or 'Width'
			xy[n] = xy[n][0].toUpperCase() + xy[n].slice(1);

			// Window
			if (windowTest(subject)) {
				result = Math.max(subject['inner' + xy[n]]);
			}
			else {
				context = subject || subject.body || subject.documentElement;
				size = context['offset' + xy[n]] || context['scroll' + xy[n]] || context['client' + xy[n]];
				result = Math.max(size);
			}
			var prop = xy[n].toLowerCase();
			output[prop] = result + 'px';
		}
	}
	return output;
}
