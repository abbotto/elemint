#!/usr/bin/env bash

# Node + ES6
node_modules/.bin/eslint -c .eslintrc.js \
--fix test/ dev/

# ES5
node_modules/.bin/eslint -c src/.eslintrc.js \
--fix src/
