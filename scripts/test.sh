#!/bin/bash
# set -e: stops the script on error
# set -u: stops the script on unset variables
# set -o pipefail:  fail the whole pipeline on first error
set -euo pipefail

# (cd front && npm run coverage)

python -m pytest --log-cli-level=Warning back --cov=back --cov-report=term-missing:skip-covered --cov-branch --no-cov-on-fail --cov-report html -m "not slow"
