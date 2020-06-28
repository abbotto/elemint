#!/usr/bin/env sh

set -eu

bold=$(tput bold)
normal=$(tput sgr0)

if command -v pre-commit >/dev/null 2>&1; then
    printf '%s\n' "${bold}> Formatting code with 'pre-commit' hooks | https://pre-commit.com/${normal}"

    printf '\n%s\n' "${bold}> Ensuring that each file is either empty, or ends with one newline${normal}"
    pre-commit run end-of-file-fixer --all-files --verbose

    printf '\n%s\n' "${bold}> Formatting 'py' files with Black | https://github.com/psf/black${normal}"
    pre-commit run prettier --all-files --verbose
else
    printf '%s\n' "${bold}> 'pre-commit' not found - https://pre-commit.com/${normal}"
	printf '%s\n' "${bold}> Skipping code fomatting${normal}"
fi
