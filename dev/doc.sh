#!/usr/bin/env bash

# Custom styles and templates
mkdir -p doc/styles
cat cfg/jsdoc.container.tmpl > node_modules/docdash/tmpl/container.tmpl
cat cfg/jsdoc.layout.tmpl > node_modules/docdash/tmpl/layout.tmpl
cat cfg/jsdoc.method.tmpl > node_modules/docdash/tmpl/method.tmpl
cp cfg/jsdoc.elemint.css doc/styles/

# Generate the documentation
node node_modules/jsdoc/jsdoc.js -r -c \
cfg/jsdoc.json src/module.js src/method/
