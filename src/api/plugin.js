/**
 * @memberof $
 * @method plugin
 *
 * @description
 * Can be used to create custom methods.
 *
 * @example
 * $.plugin.hello = function hello() {
 *     alert('hello ' + this.selector);
 *     return this;
 * };
 *
 * $('world').hello();
 */

elemint.fn.plugin = elemint.fn;
