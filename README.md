# \<Elemint /> Tricks for the DOM

[![actions](https://github.com/abbotto/elemint/workflows/Spec/badge.svg)](https://github.com/abbotto/elemint/actions)
[![actions](https://github.com/abbotto/elemint/workflows/Lint/badge.svg)](https://github.com/abbotto/elemint/actions)
[![license](https://img.shields.io/badge/License-MIT-informational.svg)](./LICENSE)
<a href="https://twitter.com/intent/tweet" target="_blank"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"/></a>

## Overview

Elemint is a fast, zero-dependency [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) library.
 
### Features

1. Traverse the DOM
2. Handle animations and events
3. Manipulate elements and styles

## Usage

### Browser

Download the latest version of the library.

[![download-zip-button](doc/assets/images/download-zip-button.png)](https://github.com/abbotto/elemint/archive/main.zip)

Include the library in the body of an HTML document.

```html
<body>
	...
	<script src='path/to/elemint.js'>
</body>
```

#### Support

Modern desktop and mobile browsers versions are supported.

- [Brave](https://brave.com/)
- [Chrome](https://www.google.com/chrome/)
- [Chromium](https://chromium.woolyss.com/download/en/)
- [Edge](https://www.microsoft.com/edge/business/download/)
- [Firefox](https://www.mozilla.org/firefox/new/)
- [Opera](https://www.opera.com/download/)
- [Safari](https://support.apple.com/downloads/safari/)

##### Baseline

If a browser supports the following features then it should be compatible with `elemint`.

```
browser.supported =
	browser.matches &&
	browser.MutationObserver &&
	browser.requestAnimationFrame;
```

### NodeJS

```
npm i @elemint/elemint
```

Require the library in a script.

```
require('@elemint/elemint');
```

## Documentation

API documentation can be found [here](https://abbotto.github.io/elemint/docs/).

## [Contributing](#contributing)

### [Getting Started](#getting-started)

1. [Toolchain](doc/read/toolchain.md)
2. [Convention](doc/read/convention.md)

### [Issues and Pull Requests](#issues-and-pull-requests)

Feel free to open a unique [issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/about-issues) or submit a [PR](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

[![open-issue-button](doc/assets/images/open-issue-button.png)](https://github.com/abbotto/elemint/issues/new)
[![open-pr-button](doc/assets/images/open-pr-button.png)](https://github.com/abbotto/elemint/compare)

#### MIT License

License information can be found [here](https://raw.githubusercontent.com/abbotto/elemint/main/LICENSE).

---

[![keep-a-changelog](https://img.shields.io/badge/keep%20a%20changelog-1.0.0-informational)](./CHANGELOG.md)
[![contributor-covenant](https://img.shields.io/badge/contributor%20covenant-1.4.0-informational.svg)](./CHANGELOG.md)
[![conventional-commits](https://img.shields.io/badge/conventional%20commits-1.0.0-informational.svg)](https://conventionalcommits.org)
[![make-a-readme](https://img.shields.io/badge/make%20a%20readme-101-informational.svg)](https://www.makeareadme.com/#readme-101)
[![semantic-versioning](https://img.shields.io/badge/semantic%20versioning-2.0.0-informational.svg)](https://semver.org/)
