/**
 * @private
 * @description
 * Test if an item is of the correct node type
 * to be supported
 *
 * @param {Array|Element}
 * @return {Boolean}
 */
function nodeTest(node) {
	return ((node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11));
}
