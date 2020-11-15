/**
 * @memberof $
 * @method style.set
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
 * $.style(target).set(style, value);
 * $.style(target).set({ prop: value, ... });
 * $(target).style.set(style, value);
 * $(target).style.set({ prop: value, ... });
 */

function styleSet(css, value) {
	const args = this;
	const len = args[1];
	const context = args[2];

	let subject = args[0];
	let styles = '';
	let i = len;

	// Insert the new rules into a stylesheet
	if (subject && subject[0] && subject[0].substring) {
		styleModel(context || document);

		if (toString(subject) === '[object Array]') {
			i = 0;

			while (i < len) {
				styleModel.sheet.insertRule(subject[i], styleModel.sheet.cssRules.length);
				i += 1;
			}
		}
		// Single rule
		else if (value && value.substring) {
			subject += ' { ' + css + ':' + value + '; }';
			styleModel.sheet.insertRule(subject, styleModel.sheet.cssRules.length);
		}
		// Multiple rules contained in an object
		else if (toString(css) === '[object Object]') {
			for (prop in css) {
				if (css.hasOwnProperty(prop)) {
					if (prop === 'content') {
						css[prop] = "'" + css[prop] + "';";
					}

					styles += prop + ':' + css[prop] + ';';
				}
			}
			subject += ' { ' + styles + ' }';
			styleModel.sheet.insertRule(subject, styleModel.sheet.cssRules.length);
		} else if (subject.substring) {
			// Inject a stylesheet
			styleModel.element.appendChild(styleModel.context.createTextNode(subject));
		}
	}
	// Apply the new rules inline on the selected elements
	else if (subject) {
		let key;

		// Single CSS style
		if (css && css.substring && value) {
			while (i--) {
				subject[i].style[css] = value;
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
		} else {
			throw new Error('Argument failed. Invalid argument.');
		}
	}
}
