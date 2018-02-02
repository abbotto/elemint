#!/usr/bin/env bash

# Custom styles and templates
mkdir -p doc/styles
cat cfg/container.tmpl > node_modules/docdash/tmpl/container.tmpl
cat cfg/layout.tmpl > node_modules/docdash/tmpl/layout.tmpl
cat cfg/method.tmpl > node_modules/docdash/tmpl/method.tmpl
cp cfg/doc.elemint.css doc/styles/

# Generate the documentation
node node_modules/jsdoc/jsdoc.js -r -c \
cfg/jsdoc.json src/core.js src/method/
