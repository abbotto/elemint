/**
 * $.style preflight
 */
var $tyles;
var $tyle = {};
$tyle.context = document;
$tyle.element = $tyles = document.createElement('style');
$tyle.element.appendChild($tyle.context.createTextNode(''));
$tyle.sheet = document.head.appendChild($tyles).sheet;


/**
 * @private
 * @param {Document|Element}
 */
function styleDocument(doc) {
	var d = doc || document;
	$tyle.context = d;
	$tyle.element = (!doc) ? $tyles : d.createElement('style');
	if (doc) {
		$tyle.element.appendChild(d.createTextNode(''));
	}
	$tyle.sheet = (!doc) ? $tyles.sheet : d.head.appendChild($tyle.element).sheet;
}
