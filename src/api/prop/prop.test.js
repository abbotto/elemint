/**
 * @description
 * Test if an element supports an attribute/property.
 *
 * @memberof $
 * @method prop.test
 *
 * @param {String} Property A property that will be tested.
 * @param {Element|Object|String} Subject The document, element, window, or tagname to test the property against.
 *
 * @example
 * $.prop(target).test('src', element);
 * $.prop(target).test('src', 'img');
 */

function propTest(prp) {
	const subject = this;
	const el = subject.substring ? document.createElement(subject) : subject;

	return prp in el;
}
