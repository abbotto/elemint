// Regular expressions
var reCamelize = /(?:^|[-])(\w)/g,
	reClassMatch = /^\.([\w\-]+)$/,
	reClassType = /^\[object (.+)\]$/,
	reDotMatch = /\./g,
	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	reIdentifier = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
	reIdMatch = /^#([\w\-]+)$/,
	reTags = /<\/?!?([A-Za-z])[^>]*>/g,
	reTagMatch = /^([\w]+)$/,
	reTrimWs = /(^\s+|\s+$)/g,
	// http://www.w3.org/TR/css3-selectors/#whitespace
	reWhitespace = '[\\x20\\t\\r\\n\\f]';
