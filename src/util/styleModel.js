/**
 * @private
 * @description
 * Add a stylesheet to a given document
 *
 * @param {Document}
 */

// Consider that 'context' could be
// set to an alternate window.document
function styleModel(context) {
	const styleElement = context.getElementById('__stylesheet__');
	styleModel.context = context;

	if (styleElement) {
		// Default <style> element for css injection
		styleModel.element = styleElement;

		// Update the styleModel object
		styleModel.sheet = styleModel.element.sheet;
	} else {
		// Create a default <style> element for css injection
		styleModel.element = context.createElement('style');

		// Hack for Webkit
		styleModel.element.appendChild(context.createTextNode(''));

		// Update the styleModel object
		styleModel.sheet = context.head.appendChild(styleModel.element).sheet;
		styleModel.element.id = '__stylesheet__';
	}
}
