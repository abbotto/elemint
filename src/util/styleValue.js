/**
 * @private
 * @description
 * Get a style value from an element
 *
 * @param {Element}
 * @param {String}
 * @return {String}
 */

function styleValue(subject, styleName) {
	const view = styleModel.context.defaultView || false;

	return subject.currentStyle
		? subject.currentStyle[camelize(styleName)]
		: view && view.getComputedStyle
		? view.getComputedStyle(subject, null).getPropertyValue(styleName)
		: subject.style[camelize(styleName)];
}
