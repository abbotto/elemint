module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 6
	},
	extends: ['standard', 'plugin:prettier/recommended'],
	plugins: ['standard', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'comma-dangle': 0,
		'global-require': 0,
		'import/no-dynamic-require': 0,
		'no-path-concat': 0,
		'no-prototype-builtins': 0,
		'no-return-assign': 0,
		'no-self-assign': 0,
		'no-tabs': 0,
		'no-undef': 0,
		'no-unmodified-loop-condition': 0,
		'no-unused-expressions': 0,
		'no-unused-vars': 0,
		'no-var': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-template': 0,
		'spaced-comment': 0,
		'wrap-iife': 0,
		'vars-on-top': 0
	}
};
