#!/bin/bash

set -euo pipefail

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../../server/variables.ini

echo "
DEBUG=True
SECRET_KEY=${SECRET_KEY:-your-secret-key}
DATABASE_URL=postgis://${PG_OWNER_USER}:${PG_OWNER_PASSWD}@localhost:${PG_PORT}/${DBNAME}
# ALLOWED_HOSTS=.localhost,127.0.0.1,[::1]
ALLOWED_HOSTS=
HTTPS=False
DATABASE_CONTROL_CHANGES_MODE=migrations
SENTRY_DSN=
# If the path is absolute it is taken as is. If relative it's taken from manage.py
MEDIA_ROOT=media
ACCESS_TOKEN_LIFETIME_SECONDS=3600
REFRESH_TOKEN_LIFETIME_SECONDS=86400
"
