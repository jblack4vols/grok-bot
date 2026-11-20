#!/usr/bin/env bash
set -euo pipefail

PORT=8765

# Exit 0 and print "ready" when the playbook is already bound for the whole
# machine. Exit 0 and print "start" when the port is free. Exit 1 on a conflict.
action=$(python3 - "$PORT" <<'PY'
import pathlib
import socket
import sys
import urllib.error
import urllib.request

port = int(sys.argv[1])

def listen_addrs(listen_port: int) -> set[str]:
    found: set[str] = set()
    for family, path in (
        (socket.AF_INET, "/proc/net/tcp"),
        (socket.AF_INET6, "/proc/net/tcp6"),
    ):
        file = pathlib.Path(path)
        if not file.is_file():
            continue
        for line in file.read_text().splitlines()[1:]:
            fields = line.split()
            local, state = fields[1], fields[3]
            ip_hex, port_hex = local.split(":")
            if int(port_hex, 16) != listen_port or state != "0A":
                continue
            raw = bytes.fromhex(ip_hex)
            if family == socket.AF_INET:
                raw = raw[::-1]
            else:
                raw = b"".join(raw[i : i + 4][::-1] for i in range(0, 16, 4))
            found.add(socket.inet_ntop(family, raw))
    return found

addrs = listen_addrs(port)
if not addrs:
    print("start")
    sys.exit(0)

reachable = "0.0.0.0" in addrs or "::" in addrs
body = ""
try:
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/", timeout=2) as response:
        body = response.read(20000).decode("utf-8", "replace")
except (OSError, urllib.error.URLError):
    body = ""
is_playbook = "Grok Bots" in body and 'id="bot-search"' in body
if is_playbook and reachable:
    print("ready")
    sys.exit(0)

print(
    f"port {port} is in use ({', '.join(sorted(addrs))}), "
    "but it is not the leadership playbook bound to 0.0.0.0",
    file=sys.stderr,
)
sys.exit(1)
PY
)

if [[ "$action" == "ready" ]]; then
  echo "leadership playbook already listening on 0.0.0.0:${PORT}"
  exit 0
fi
if [[ "$action" != "start" ]]; then
  echo "unexpected start check result: ${action}" >&2
  exit 1
fi

cd leadership-guide
exec python3 -m http.server "${PORT}" --bind 0.0.0.0
