/**
 * @private
 * @description
 * Add a stylesheet to the document
 *
 * @param {Document|Element}
 * @return {Boolean}
 */

let $styles;

const $style = {};
$style.context = document;
$style.element = $styles = document.createElement('style');
$style.element.appendChild($style.context.createTextNode(''));
$style.sheet = document.head.appendChild($styles).sheet;

function styleDocument(doc) {
	const d = doc || document;
	$style.context = d;
	$style.element = !doc ? $styles : d.createElement('style');

	if (doc) {
		$style.element.appendChild(d.createTextNode(''));
	}

	$style.sheet = !doc ? $styles.sheet : d.head.appendChild($style.element).sheet;
}

/**
 * @private
 * @description
 * Get a style value from an element
 *
 * @param {Element}
 * @param {String}
 * @return {String}
 */

function getStyleValue(subject, styleName) {
	return subject.currentStyle
		? subject.currentStyle[camelize(styleName)]
		: $style.context.defaultView && $style.context.defaultView.getComputedStyle
		? $style.context.defaultView
				.getComputedStyle(subject, null)
				.getPropertyValue(styleName)
		: subject.style[camelize(styleName)];
}
