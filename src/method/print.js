/**
 * @memberof $
 * @method $.print
 *
 * @description
 * - When window.print() is called, the original document can be printed by the browser.
 * - In order to print custom HTML instead of the whole document, HTML will be injected into an Iframe.
 * - When iframe.print() is called, the injected HTML can be printed by the browser.
 * - HTML can also be injected into the iframe document and applied to the injected HTML.
 *
 * @param {String} config.template A HTML string or DOM node that will printed.
 * @param {Array} config.script URLs for scripts.
 * @param {Array} config.style URLs for stylesheets.
 * @param {Object|Boolean} config.copy Set to `true` to use all stylesheets and scripts from the original document.
 * @param {Boolean} config.copy.style Copy all the styles from the original document to the print document.
 * @param {Boolean} config.copy.script Copy all the scripts from the original document to the print document.
 *
 * @example
 * $.print({
 *     template: {
 * 		   html: "<div>Hello world!</div>"
 *     },
 *     copy: true
 * });
 */
var print = function print(config) {
	var template = config.template.nodeType === 1
		? config.template.outerHTML
		: config.template.substring
			? config.template
			: null
	;

	var styles = config.style || [];
	var scripts = config.script || [];
	var assets = styles.concat(scripts);
	var test = config.test;
	var copy = config.copy || {};
	var document = window.document;

	var job = {
		styles: 0,
		scripts: 0,
		template: false,
		print: true
	};

	// Print when ready
	return (function printReady(printingTemplate) {
		// Build the iframe
		var frameName = ('elemint-print-' + Date.now());
		var iFrame = '<iframe style="width:1px; height: 1px; position: absolute; left: -9999px" id="' + frameName + '" name="' + frameName + '">';
		document.body.insertAdjacentHTML('afterBegin', iFrame);

		// Insert a document into the current iframe
		var frameElement = document.getElementById(frameName);
		var frame = window.frames[frameName];
		var frameDocument = frame.document;
		var styleFragment = document.createDocumentFragment();
		var scriptFragment = document.createDocumentFragment();
		var frameHTML = '<!DOCTYPE html><html><head></head><body>';
		frameHTML += printingTemplate;
		frameHTML += '</body></html>';
		frameDocument.open();
		frameDocument.write(frameHTML);
		frameDocument.close();

		// Copy assets from the original document
		if (copy === true || copy.style === true) {
			// Grab all the linked and embedded assets on the parent document
			var css = document.querySelectorAll('link, style');
			styleFragment = scrapePrintAssets(css, styleFragment);
		}
		if (copy === true || copy.script === true) {
			// Grab all the linked and embedded assets on the parent document
			var js = document.querySelectorAll('script');
			scriptFragment = scrapePrintAssets(js, scriptFragment);
		}

		// Asset handler
		if (Array.isArray(assets)) {
			var link,
				script;

			var i = 0;
			var len = assets ? assets.length : 0;
			for (; i < len; i++) {
				var ext = assets[i].substr(assets[i].lastIndexOf('.') + 1);

				if (ext === 'css') {
					styleFragment = injectPrintLink(styleFragment, assets[i]);
				}
				else if (ext === 'js') {
					scriptFragment = injectPrintScript(scriptFragment, assets[i]);
				}
			}
		}

		// Job output
		job.styles = styleFragment.children ? styleFragment.children.length : 0;
		job.scripts = scriptFragment.children ? scriptFragment.children.length : 0;
		job.template = printingTemplate;

		if (!frame.print) job.print = false;

		// Execute the print job
		function printJob() {
			// In IE, you have to focus() the IFrame prior to printing
			// or else the top-level page will print instead
			if (!test) frame.focus();
			if (!test) frame.print();
			return finalizePrintJob(job, frameName, frameElement);
		}

		// Append assets to the head
		var head = frameDocument.getElementsByTagName('head')[0];
		head.appendChild(styleFragment);
		head.appendChild(scriptFragment);

		// Get the last appended asset
		var lastChild = head.lastChild;
		if (!lastChild || !!test) return printJob();

		var timeout = true,
			count = 0;

		// The load event is fired when a resource
		// and its dependent resources have finished loading
		// * FF and IE browsers wouldn't work without calling setInterval
		lastChild.addEventListener('load', function (event) {
			timeout = false;
		}, 0);

		var interval = setInterval(function () {
			if (!timeout) {
				clearInterval(interval);
				return printJob();
			}
			// Fail after trying for 5 seconds
			else if (count === 20) {
				clearInterval(interval);
				throwError('Print job timed out after 20 seconds.');
			}

			count += 1;
		}, 250);
	}(template));
};

function finalizePrintJob(job, frameName, frameElement) {
	// Clear the IFrame
	delete window.frames[frameName];
	document.body.removeChild(frameElement);
	return job;
}

function scrapePrintAssets(arr, fragment) {
	var clone;
	var k = 0;
	var len = arr ? arr.length : 0;
	for (; k < len; k++) {
		// Deep clone the original style element
		clone = arr[k].cloneNode(true);
		fragment.appendChild(clone);
	}
	return fragment;
}

function injectPrintScript(fragment, asset) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = false;
	script.src = asset;
	fragment.appendChild(script);
	return fragment;
}

function injectPrintLink(fragment, asset) {
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = asset;
	fragment.appendChild(link);
	return fragment;
}
