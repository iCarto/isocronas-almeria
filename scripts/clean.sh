#!/bin/bash

set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${this_dir}"/../scripts/variables.ini

find ./back -type f -name "*.pyc" -delete
find ./back -type d -name "__pycache__" -delete
find ./back -type f -path "*.egg-info*" -delete
find ./back -type d -path "*.egg-info" -delete
rm -rf .pytest_cache
rm -rf .ruff_cache
rm -rf front/dist
rm -rf "${PROJECT_NAME}.egg-info"
sudo rm -rf .cache/volumes
