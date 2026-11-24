#!/bin/sh
# Counts Wireshark commits per year (author date) from a local clone and writes data/wireshark.json.
# Usage: sh scripts/wireshark-history.sh /path/to/wireshark [ref]   (ref defaults to origin/master)
set -e
SRC="${1:?path to a Wireshark clone}"; REF="${2:-origin/master}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/data/wireshark.json"
cd "$SRC"
AS_OF=$(git log -1 --format=%ad --date=short "$REF")
MONTHS=$(git log --format=%ad --date=format:%Y-%m "$REF" | sort -u | wc -l | tr -d " ")
YEARS=$(git log --format=%ad --date=format:%Y "$REF" | sort | uniq -c | awk '{printf "%s\"%s\": %s", (NR>1?", ":""), $2, $1}')
cat > "$OUT" <<JSON
{
  "source": "git log of the Wireshark repository (gitlab.com/wireshark/wireshark), commits on master by author date",
  "as_of": "$AS_OF",
  "active_months": $MONTHS,
  "commits": { $YEARS },
  "milestones": [
    { "date": "1998-09-16", "label": "First commit, as Ethereal" },
    { "date": "2006-07-18", "label": "Renamed Wireshark (0.99.2)" },
    { "date": "2008-03-29", "label": "1.0" },
    { "date": "2015-11-18", "label": "2.0" },
    { "date": "2019-02-28", "label": "3.0" },
    { "date": "2022-10-04", "label": "4.0" },
    { "date": "2025-10-02", "label": "4.6" }
  ]
}
JSON
echo "wrote $OUT (as of $AS_OF)"
