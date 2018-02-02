/**
 * @private
 * @description
 * Reset the list of cached elements when elements are added/removed to/from the DOM
 */
function nodeCache() {
	if (browser.MutationObserver) {
		// Create an observer instance
		var mutate = new window.MutationObserver((function (e) {
			// Normalize the event
			e = e || window.event;
			e.some(function (mutation) {
				// Prevent double-fire
				if (Object.keys(queries.cache).length !== 0) {
					queries.cache = {};
				}
				return e;
			});
		}));
		// Configuration of the observer
		var config = {
			attributes: false,
			childList: true,
			characterData: false,
			subtree: true
		};
		// Pass in the target node, as well as the observer options
		mutate.observe(document, config);
	}
	else {
		['DOMNodeInserted', 'DOMNodeRemoved'].forEach(function (evt) {
			document.addEventListener(evt, function (e) {
				var keys = Object.keys(queries.cache);
				// Prevent double-fire
				if (keys.length !== 0) {
					queries.cache = {};
				}
				return e;
			}, 0);
		});
	}
}
// Reset the cache when DOM nodes are are inserted or removed
nodeCache();
