/**
 * @description
 * Watch for mutations within a DOM tree node.
 *
 * @memberof $
 * @method watch.set
 *
 * @param {Node} target A DOM tree Node to watch for changes at the root or subtree level.
 * @param {Object} config The config is a 1:1 copy of the [MutationObserverInit](ttps://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) config. At least `childList`, `attributes`, and/or `characterData` must be `true`.
 * @param {Array} config.attributeFilter Specific attribute names to be monitored. If this property isn't included, changes to all attributes cause mutation notifications. No default value.
 * @param {Boolean} config.attributeOldValue Record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes.
 * @param {Boolean} config.attributes Watch for changes to the value of attributes on the node or nodes being monitored.
 * @param {Boolean} config.characterData Monitor the specified target node or subtree for changes to the character data contained within the node or nodes. No default value.
 * @param {Boolean} config.characterDataOldValue Record the previous value of a node's text whenever the text changes on nodes being monitored.
 * @param {Boolean} config.childList Monitor the target node (and, if subtree is true, its descendants) for the addition of new child nodes or removal of existing child nodes. The default is `false`.
 * @param {Boolean} config.subtree Watch the entire subtree of nodes rooted at `target`. The other config properties are applied to the subtree nodes instead of only the target node. The default value is `false`.
 * @param {Function} callback A callback function .
 *
 * @example
 * $.watch(target).set(
 *     'tagName',
 *     { data: ... },
 *     function callback(mutations, observer) { ... }
 * );
 */

const watchers = {
	job: {}
};

function watchSet(tag, config, callback) {
	const context = this || document;

	const observer = new MutationObserver((mutations) => {
		callback(mutations, observer);
		return mutations;
	});

	watchers.job[tag] = observer;

	observer.observe(context, config);
}
