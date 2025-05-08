#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${this_dir}"/output.sh

declare -a programs=("docker" "python3" "npm" "mkvirtualenv" "pyenv")

## now loop through the above array
for program in "${programs[@]}"; do
    if ! command -v "${program}" > /dev/null 2>&1; then
        red "ERROR: ${program} is need to install the development environment"
        exit 1
    fi
done

declare -a optional_programs=("shfmt" "shellcheck" "psql")

## now loop through the above array
for program in "${optional_programs[@]}"; do
    if ! command -v "${program}" > /dev/null 2>&1; then
        yellow "WARNING: ${program} is not installed. You can continue by dev experience can be not optimal"
        sleep 1
    fi
done
