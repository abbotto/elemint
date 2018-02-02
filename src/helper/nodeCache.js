// Reset the list of cached elements when elements are added and/or removed in the DOM
if (browser.MutationObserver) {
	var nodeCache = function (m) {
		if (Object.keys(queries.cache).length) {
			m.some(function (mutation) {
				if (mutation.type === 'childList') queries.cache = {};
				return m;
			});
		}
	};

	var mod = new window.MutationObserver(nodeCache);

	mod.observe(document, {
		childList: true,
		subtree: true
	});
}
else {
	loop(['DOMNodeInserted', 'DOMNodeRemoved'], function (evt) {
		document.addEventListener(evt, function nodeCache(e) {
			if (Object.keys(queries.cache).length) queries.cache = {};
		}, 0);
	});
}
