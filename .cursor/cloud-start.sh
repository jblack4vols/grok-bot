#!/usr/bin/env bash
set -euo pipefail

PORT=8765
if curl -fsS -o /dev/null --max-time 2 "http://127.0.0.1:${PORT}/" 2>/dev/null; then
  echo "leadership playbook already listening on ${PORT}"
  exit 0
fi

cd leadership-guide
exec python3 -m http.server "${PORT}" --bind 0.0.0.0
