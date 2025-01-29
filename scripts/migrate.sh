#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../server/variables.ini
# source "${this_dir}"/../tools/db_utils.sh

python "${this_dir}/../back/manage.py" makemigrations
python "${this_dir}/../back/manage.py" migrate
