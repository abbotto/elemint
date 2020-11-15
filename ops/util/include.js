#!/usr/bin/env node

/* eslint-disable no-useless-escape */
const fs = require('fs');
const pkg = require(`${__dirname}/../../package.json`);

const include = (root, output) => {
	let rootContent = fs.readFileSync(root, 'utf8');

	const matches = rootContent.match(
		/^(\s+)?(\/\/|\/\*|\#|\<\!\-\-)(\s+)?=(\s+)?(include)(.+$)/gm
	);

	matches &&
		matches.length &&
		matches.forEach((match) => {
			const filename = `${__dirname}/../../src/${match.split('//=include ')[1]}`;
			if (filename.indexOf('undefined') < 0) {
				if (filename === `${__dirname}/../../src/version`) {
					rootContent = rootContent
						.split(match)
						.join(`elemint.version = '${pkg.version}'`);
				} else {
					rootContent = rootContent
						.split(match)
						.join(fs.readFileSync(filename, 'utf8'));
				}
			}
		});

	fs.writeFile(output, rootContent, { flag: 'wx' }, (error) => error);
};

let dev = '';

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
	dev = '.dev';
}

include(
	`${__dirname}/../../src/module.js`,
	`${__dirname}/../../elemint${dev}.js`
);
