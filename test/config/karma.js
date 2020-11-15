process.env.CHROMIUM_BIN = require('puppeteer').executablePath();

const files = [
	'../../elemint.dev.js',
	'../bootstrap.js',
	'../spec/after.js',
	'../spec/animate.js',
	'../spec/ascend.js',
	'../spec/before.js',
	'../spec/child.js',
	'../spec/class.js',
	'../spec/descend.js',
	'../spec/event.js',
	'../spec/fragment.js',
	'../spec/layer.js',
	'../spec/match.js',
	'../spec/mount.js',
	'../spec/offset.js',
	'../spec/parent.js',
	'../spec/prop.js',
	'../spec/query.js',
	'../spec/ready.js',
	'../spec/render.js',
	'../spec/sibling.js',
	'../spec/size.js',
	'../spec/style.js',
	'../spec/unmount.js',
	'../spec/watch.js'
];

const specReporter = {
	failFast: false,
	showSpecTiming: true,
	suppressErrorSummary: false,
	suppressFailed: false,
	suppressPassed: true,
	suppressSkipped: true
};

const settings = {
	autoWatch: false,
	browserNoActivityTimeout: 100000,
	browsers: ['ChromiumHeadless'],
	captureTimeout: 30000,
	colors: true,
	concurrency: Infinity,
	files,
	flags: ['--no-sandbox'],
	frameworks: ['chai', 'mocha'],
	logLevel: 'INFO',
	port: 9876,
	reporters: ['spec'],
	singleRun: true,
	specReporter
};

module.exports = (config) => config.set(settings);
