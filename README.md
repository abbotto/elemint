[![Build Status](https://travis-ci.org/abbotto/elemint.svg?branch=master)](https://travis-ci.org/abbotto/elemint)
[![David](https://img.shields.io/david/expressjs/express.svg)](https://david-dm.org/abbotto/elemint.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.md)
<a href="https://twitter.com/intent/tweet" target="_blank"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"/></a>

##### Elemint is maintained under the [semantic versioning](http://semver.org/) guidelines

---

# Tricks for the DOM 

Elemint is a fast, zero-dependency DOM library.
 
#### Features

- Traverse the DOM.
- Manage animations and events.
- Manipulate elements and styles.

#### API Usage
- API documentation can be found [here](https://abbotto.github.io/elemint/docs/).

#### Browser Usage

- Download the latest version of the library from [here](https://github.com/abbotto/elemint/archive/master.zip).
- Include the library in the body of an HTML document:

		<script src='path/to/elemint.js'>

#### Support

Modern desktop and mobile browsers versions are supported.

- Chrome
- Chromium
- Edge
- Firefox
- Opera
- Safari

##### Cutting the mustard

Under the hood, Elemint will check to see if the browser passes a feature test:

```
browser.supported =
	browser.matches &&
	browser.MutationObserver &&
	browser.requestAnimationFrame;
```

If the above criteria are met then the browser should be supported.

If you run into issues with browser compatibility, please filea bug report.

[Reference](https://responsivenews.co.uk/post/18948466399/cutting-the-mustard)

#### NPM Usage

**Install**

- Download the latest version of the library:

		npm i @elemint/elemint

- Require the library in a script:

		require('@elemint/elemint');

#### Contributing
- Infomation on how to contribute can be found [here](https://raw.githubusercontent.com/abbotto/elemint/master/CONTRIBUTING.md).

#### MIT License
- License information can be found [here](https://raw.githubusercontent.com/abbotto/elemint/master/LICENSE.md).