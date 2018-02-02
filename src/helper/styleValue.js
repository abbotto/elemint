/**
 * @private
 * @param {Array|Element}
 * @param {String}
 * @return {String}
 */
function getStyleValue(subject, styleName) {
	/* eslint-disable indent */
	return subject.currentStyle
		? subject.currentStyle[camelize(styleName)]
	: $tyle.context.defaultView && $tyle.context.defaultView.getComputedStyle
		? $tyle.context.defaultView.getComputedStyle(subject, null).getPropertyValue(styleName)
		: subject.style[camelize(styleName)]
	;
}
