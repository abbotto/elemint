/**
 * @private
 * @description
 * Test if a subject is the correct node type
 *
 * @param {Element}
 * @return {Boolean}
 */

function isNode(node) {
	return node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11;
}
