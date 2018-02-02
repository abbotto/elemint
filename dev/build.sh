#!/usr/bin/env bash

# Include scripts
node dev/include.js

# Minify the build
node_modules/.bin/uglifyjs \
dist/elemint.js > dist/elemint.min.js
