#!/usr/bin/env sh

# Node + ES6
node_modules/.bin/eslint -c .eslintrc.js \
--fix test/ tool/

# ES5
node_modules/.bin/eslint -c src/.eslintrc.js \
--fix src/
