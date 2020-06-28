#!/usr/bin/env sh

documentation build src/** \
-f html \
-o doc \
--theme node_modules/documentation-theme-light
