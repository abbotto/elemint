#!/usr/bin/env sh

set -eu

bold=$(tput bold)
normal=$(tput sgr0)

printf '%s\n' "${bold}> Building 'elemint.js'${normal}"

if ! command -v uglifyjs >/dev/null 2>&1; then
    printf '%s\n' "${bold}> 'uglifyjs' not found - https://github.com/mishoo/UglifyJS/${normal}"
	printf '%s\n' "${bold}> Skipping code fomatting${normal}"
    exit 127
fi

rm -rf ./elemint.js

node ops/util/include.js

printf '%s\n' "${bold}> Minifying code with 'uglifyjs'${normal}"
printf '%s\n' "${bold}  - https://github.com/mishoo/UglifyJS/${normal}"

# shellcheck disable=SC2094,SC2002
cat elemint.js | uglifyjs --verbose --config-file ops/config/uglify.config.json -o elemint.js

# Prepend package information to the distribution
package_json="require('./package.json')"
year=$(date +"%Y")
author="$(node -p -e ${package_json}.author)"
copyright="2018-${year} ${author}"
name="$(node -p -e ${package_json}.name)"
description="$(node -p -e ${package_json}.description)"
license="$(node -p -e ${package_json}.license)"
version="$(node -p -e ${package_json}.version)"

pkg_info="// ${name} v${version} | ${description}\n"
pkg_info="${pkg_info}// Copyright (c) ${copyright}\n"
pkg_info="${pkg_info}// Distributed under the ${license} license\n"

echo "${pkg_info}$(cat elemint.js)" > elemint.js
