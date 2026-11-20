#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import pathlib
import sys

root = pathlib.Path(".")
required = [
    "README.md",
    "leadership-guide/index.html",
    "leadership-guide/js/app.js",
    "leadership-guide/js/data.js",
    "leadership-guide/css/styles.css",
    "leadership-guide/assets/hero.jpg",
]
missing = [path for path in required if not (root / path).is_file()]
logs = list((root / "knowledge-log").glob("20*.md"))
if missing or not logs:
    print("missing files:", missing or "none", "knowledge-log days:", len(logs))
    sys.exit(1)
print(f"grok-bot ready: playbook present, knowledge-log days={len(logs)}")
PY
