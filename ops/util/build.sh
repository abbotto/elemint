#!/usr/bin/env sh

# Cleanup
rm -f elemint.js

# Include scripts
node ops/util/include.js

# This is a `dist` build
if [ "$1" != "test" ]; then
	# Minify the build
	node_modules/.bin/uglifyjs --config-file ops/config/uglify.config.json \
	elemint.js > elemint.min.js

	CONTENT=$(cat elemint.min.js)
	rm -rf elemint.js elemint.min.js

	# Prepend package information to the distribution
	PACKAGE_JSON="require('./package.json')"
	YEAR=$(date +"%Y")
	AUTHOR="$(node -p -e ${PACKAGE_JSON}.author)"
	COPYRIGHT="${YEAR} ${AUTHOR}"
	NAME="$(node -p -e ${PACKAGE_JSON}.name)"
	DESCRIPTION="$(node -p -e ${PACKAGE_JSON}.description)"
	LICENSE="$(node -p -e ${PACKAGE_JSON}.license)"
	VERSION="$(node -p -e ${PACKAGE_JSON}.version)"

	echo "// ${NAME} v${VERSION} | ${DESCRIPTION}" > elemint.js
	echo "// Copyright (c) ${COPYRIGHT}" >> elemint.js
	echo "// Distributed under the ${LICENSE} license" >> elemint.js
	echo "${CONTENT}" >> elemint.js
fi
