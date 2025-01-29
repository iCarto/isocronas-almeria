#!/bin/bash

set -euo pipefail

echo "
REACT_APP_PAGE_SIZE=10
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_IDLE_SECONDS_LOGOUT=600
REACT_APP_GOOGLE_ANALYTICS_CODE=
REACT_APP_SENTRY_DSN=
REACT_APP_SNIMF_BASE_LAYER_URL=http://localhost:8080/ows/?map=/io/data/SNIMF/snimf_server.qgz
"
