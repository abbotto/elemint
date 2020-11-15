#!/usr/bin/env sh

set -eu

bold=$(tput bold)
normal=$(tput sgr0)

printf '%s\n' "${bold}> Formatting code${normal}"

if ! command -v eslint >/dev/null 2>&1; then
    printf '%s\n' "${bold}> 'eslint' not found - https://eslint.org/${normal}"
	printf '%s\n' "${bold}> Skipping code fomatting${normal}"
    exit 127
fi

if ! command -v prettier >/dev/null 2>&1; then
    printf '%s\n' "${bold}> 'prettier' not found - https://prettier.io/${normal}"
	printf '%s\n' "${bold}> Skipping code fomatting${normal}"
    exit 127
fi

printf '%s\n' "${bold}> Running 'eslint' and 'prettier'"
printf '%s\n' "${bold}  - https://eslint.org/${normal}"
printf '%s\n' "${bold}  - https://prettier.io/${normal}"

eslint -c .eslintrc.js --fix ./src ./test ./ops
