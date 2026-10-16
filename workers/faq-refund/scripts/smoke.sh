#!/usr/bin/env bash
# Calls the deployed (or `wrangler dev`) route twice: expects MISS, then HIT.
set -euo pipefail
URL="${1:-http://localhost:8787}/faq/refund"
for i in 1 2; do
  status=$(curl -s -o /dev/null -D - "$URL" | awk -F': ' 'tolower($1)=="cf-aig-cache-status"{print $2}' | tr -d '\r')
  echo "call $i: cf-aig-cache-status=$status"
  statuses+=("$status")
done
[[ "${statuses[0]}" == "MISS" && "${statuses[1]}" == "HIT" ]] && echo "OK: MISS -> HIT" || { echo "FAIL"; exit 1; }
