// For ChromeHeadless via Puppeteer
process.env.CHROMIUM_BIN = require('puppeteer')
	.executablePath()
;

const files = [
	'../dist/elemint.js',
	'../test/bootstrap.js',
	'../test/method/after.js',
	'../test/method/animate.js',
	'../test/method/ascend.js',
	'../test/method/before.js',
	'../test/method/child.js',
	'../test/method/class.js',
	'../test/method/descend.js',
	'../test/method/event.js',
	'../test/method/fragment.js',
	'../test/method/insert.js',
	'../test/method/layer.js',
	'../test/method/match.js',
	'../test/method/mount.js',
	'../test/method/offset.js',
	'../test/method/parent.js',
	'../test/method/position.js',
	'../test/method/print.js',
	'../test/method/prop.js',
	'../test/method/query.js',
	'../test/method/ready.js',
	'../test/method/remove.js',
	'../test/method/render.js',
	'../test/method/sibling.js',
	'../test/method/size.js',
	'../test/method/style.js'
];

const specReporter = {
	failFast: false,
	showSpecTiming: true,
	suppressErrorSummary: false,
	suppressFailed: false,
	suppressPassed: true,
	suppressSkipped: true,
};

const settings = {
	autoWatch: false,
	browserNoActivityTimeout: 100000,
	browsers: ['ChromiumHeadless'],
	captureTimeout: 30000,
	colors: true,
	concurrency: Infinity,
	frameworks: ['mocha', 'chai'],
	logLevel: 'INFO',
	port: 9876,
	reporters: ['spec'],
	singleRun: true,
	files,
	specReporter,
};

module.exports = config => config.set(settings);
