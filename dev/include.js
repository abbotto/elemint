#!/usr/bin/env node

/* eslint-disable no-useless-escape */
const fs = require('fs');

const include = (root, output) => {
	let rootContent = fs.readFileSync(root, 'utf8');
	const matches = rootContent.match(/^(\s+)?(\/\/|\/\*|\#|\<\!\-\-)(\s+)?=(\s+)?(include)(.+$)/mg);

	(matches && matches.length) && matches.forEach((match) => {
		const filename = __dirname
			+ '/../src/'
			+ match.split('//=include ')[1]
		;

		if (filename.indexOf('undefined') < 0) {
			rootContent = rootContent.split(match)
				.join(fs.readFileSync(filename, 'utf8'))
			;
		}
	});

	rootContent = rootContent
		.split('%%VERSION%%')
		.join(require('../package.json').version)
	;

	const options = {};
	const dist = `${__dirname}/../dist`;

	if (!fs.existsSync(dist)) {
		fs.mkdirSync(dist);
		if (!fs.existsSync(`${dist}/element.js`)) options.flag = 'wx';
	}

	fs.writeFile(output, rootContent, options, error => error);
};

include(
	__dirname + '/../src/core.js',
	__dirname + '/../dist/elemint.js'
);
