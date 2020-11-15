#!/usr/bin/env sh

set -eu

bold=$(tput bold)
normal=$(tput sgr0)

pip install pipx

if command -v pipx >/dev/null 2>&1; then
    printf '%s\n' "${bold}> Installing apps with 'pipx'${normal}"
    printf '%s\n' "${bold}  - https://github.com/pipxproject/pipx${normal}"

    pipx install commitizen
    pipx install pre-commit

else
    printf '%s\n' "${bold}> 'pipx' not found - https://github.com/pipxproject/pipx${normal}"
fi

if command -v pre-commit >/dev/null 2>&1; then
    printf '%s\n' "${bold}> Installing 'pre-commit' for Git hooks${normal}"
    printf '%s\n' "${bold}  - https://pre-commit.com/${normal}"

    pre-commit install --hook-type commit-msg
    pre-commit install
else
    printf '%s\n' "${bold}> 'pre-commit' not found - https://pre-commit.com/${normal}"
fi

if command -v npm >/dev/null 2>&1; then
    printf '%s\n' "${bold}> Installing 'node' dependencies with 'npm'${normal}"
    printf '%s\n' "${bold}  - https://www.npmjs.com/${normal}"

    nvm use
    npm i
else
    printf '%s\n' "${bold}> 'npm' not found - https://www.npmjs.com/${normal}"
fi
