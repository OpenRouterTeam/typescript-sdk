#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DOCS_DIR="docs"

if [[ ! -d "$DOCS_DIR" ]]; then
	echo "missing $DOCS_DIR" >&2
	exit 1
fi

find "$DOCS_DIR" -type f -name '*.mdx' -exec perl -0pi -e '
	s/:heavy_check_mark:/✅/g;
	s/:heavy_minus_sign:/➖/g;
	s/:warning:/⚠️/g;
' {} +

if matches="$(find "$DOCS_DIR" -type f -name '*.mdx' -exec grep -HnE ':[a-z][a-z0-9_+-]*:' {} + || true)" && [[ -n "$matches" ]]; then
	echo "unmapped emoji shortcodes remain under $DOCS_DIR, add them to this script:" >&2
	printf '%s\n' "$matches" >&2
	exit 1
fi
