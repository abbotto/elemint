/**
 * @private
 * @param {Array|Element}
 * @param {String}
 * @return {String}
 */
function getStyleValue(subject, css) {
	var i = subject.length;
	(i > 0) || (subject = [subject], i = 1);

	while (i--) {
		if (subject[i].currentStyle) {
			return subject[i].currentStyle[camelize(css)];
		}
		else if ($tyle.context.defaultView && $tyle.context.defaultView.getComputedStyle) {
			return $tyle.context.defaultView.getComputedStyle(subject[i], null).getPropertyValue(css);
		}

		return subject[i].style[camelize(css)];
	}
}
