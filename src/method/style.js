/**
 * @memberof $
 * @method $.style
 *
 * @description
 * Manage document styles.
 *
 * @param {Element|Array|String} elementOrProp An element(s) or CSS selector.
 * @param {Document|Element} context The context which will be used - default is `document`.
 * @return {Object} props An object containing the 'set, get' methods.
 *
 * @example
 * $.style("div:before", document);
 * $.style(element);
 */
var style = function style(subject, doc) {
	var styles = '';
	var prop;
	var len;
	var i;

	// Set the document
	(!!doc || (!doc && $tyle.context !== document)) && styleDocument(doc);

	return {
		/**
		 * @memberof $
		 * @method style/set
		 *
		 * @description
		 * Get style values from an element.
		 *
		 * @param {Object|String} rulesOrProperty CSS key-pair list or a CSS property name.
		 * @param {String} value The style that will be applied.
		 *
		 * @example
		 * // Single rule injection into document stylesheets with object
		 * $.style("div:before").set({ prop: value, ... });
		 *
		 * // Single rule injection into document stylesheets with string
		 * $.style("div:before").set("{ prop: value, ... }");
		 *
		 * // Multiple rule injection into document stylesheets with string
		 * $.style("div:before { prop: value, ... } div:after { prop: value, ... } ...").set();
		 *
		 * // Multiple rule injection into document stylesheets with string via array
		 * $.style(["div:before { prop: value, ... }", "div:after { prop: value, ... }"]).set();
		 *
		 * // Inline rules
		 * $.style(element, optionalContext).set(style, value);
		 * $.style(element, optionalContext).set({ prop: value, ... });
		 * $(element).style.set(style, value, optionalContext);
		 * $(element).style.set({ prop: value, ... }, optionalContext);
		 */
		set: function styleSet(css, opt) {
			// Insert the new rules into a stylesheet
			if (subject && subject[0] && subject[0].substring) {
				if (toString(subject) === '[object Array]') {
					i = 0;
					len = subject.length;
					while (i < len) {
						$tyle.sheet.insertRule(subject[i], $tyle.sheet.cssRules.length);
						i += 1;
					}
				}
				// Single rule
				else if (!!opt && !!opt.substring) {
					subject += ' { ' + css + ':' + opt + '; }';
					$tyle.sheet.insertRule(subject, $tyle.sheet.cssRules.length);
				}
				// Multiple rules contained in an object
				else if (toString(css) === '[object Object]') {
					for (prop in css) {
						if (css.hasOwnProperty(prop)) {
							styles += prop + ':' + prop === 'content'
								? '\'' + css[prop] + '\';'
								: css[prop] + ';'
							;
						}
					}
					subject += ' { ' + styles + ' }';
					$tyle.sheet.insertRule(subject, $tyle.sheet.cssRules.length);
				}
				else if (subject.substring) {
					// Inject a stylesheet
					$tyle.element.appendChild($tyle.context.createTextNode(subject));
				}
			}
			// Apply the new rules inline on the selected elements
			else if (subject) {
				var key,
					n;
				i = subject.length;
				(i > 0) || (subject = [subject], i = 1);

				// Single CSS style
				if (!!css && !!css.substring && !!opt) {
					while (i--) {
						subject[i].style[css] = opt;
					}
				}

				// Loop through CSS object containing multiple styles and set them on each element
				else if (toString(css) === '[object Object]') {
					while (i--) {
						for (key in css) {
							if (css.hasOwnProperty(key)) {
								subject[i].style[key] = css[key];
							}
						}
					}
				}
				else {
					throwError('Argument failed. Invalid argument.');
				}
			}
		},
		/**
		 * @memberof $
		 * @method style/get
		 *
		 * @description
		 * Get style values from an element.
		 *
		 * @param {String} style The style(s) whose value will be returned.
		 * @returns {Object|String} CSS key-pair list or a CSS property value.
		 *
		 * @example
		 * $.style(element).get(prop1, prop2, propN, ...);
		 * $(selector).style.get(prop1, prop2, propN, ...);
		 */
		get: function styleGet() {
			i = subject.length;
			(i > 0) || (subject = [subject], i = 1);
			css = toArray(arguments);

			if (css.length === 1) return getStyleValue([subject[0]], css[0]);

			var values = {};
			var n = 0;
			i += 1;

			for (; n < i; n += 1) {
				x = css.length;
				while (x--) values[css[x]] = getStyleValue([subject[n]], css[x]);
				return values;
			}
		}
	};
};
