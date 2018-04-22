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
 * // Single rule injection into document stylesheets with string
 * $.style('div:before').set(prop, value);
 *
 * // Multiple rule injection into document stylesheets with object
 * $.style('div:before').set({ prop: value, ... });
 *
 * // Multiple rule injection into document stylesheets with string
 * $.style('div:before { prop: value, ... } div:after { prop: value, ... } ...').set();
 *
 * // Multiple rule injection into document stylesheets with string via array
 * $.style(['div:before { prop: value, ... }', 'div:after { prop: value, ... }']).set();
 *
 * // Inline rules
 * $.style(target, optionalContext).set(style, value);
 * $.style(target, optionalContext).set({ prop: value, ... });
 * $(target).style.set(style, value, optionalContext);
 * $(target).style.set({ prop: value, ... }, optionalContext);
 */
function styleSet(css, opt) {
	var args = this;
	var subject = args[0];
	var len = args[1];
	var styles = '';
	var i;

	// Insert the new rules into a stylesheet
	if (subject && subject[0] && subject[0].substring) {
		if (toString(subject) === '[object Array]') {
			i = 0;

			while (i < len) {
				$tyle.sheet.insertRule(subject[i], $tyle.sheet.cssRules.length);
				i += 1;
			}
		}
		// Single rule
		else if (opt && opt.substring) {
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
		var key;
		var n;

		// Single CSS style
		if (css && css.substring && opt) while (i--) subject[i].style[css] = opt;

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
		else throwError('Argument failed. Invalid argument.');
	}
}
