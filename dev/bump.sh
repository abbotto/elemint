#!/usr/bin/env bash

if [ "$1" == "major" ]; then
	gulp bump-major --gulpfile cfg/gulp.js
elif [ "$1" == "minor" ]; then
	gulp bump-major --gulpfile cfg/gulp.js
elif [ "$1" == "patch" ]; then
	gulp bump-major --gulpfile cfg/gulp.js
else
	false
fi
