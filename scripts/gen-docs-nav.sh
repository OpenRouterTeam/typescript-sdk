#!/usr/bin/env bash
# Regenerate docs/docs.json navigation from the service pages Speakeasy emits
# under docs/sdks/<tag>/README.mdx.
#
# The docs.json exposes a flat `navigation.pages` array so it can be mounted
# into the base docs site via a `sourceRef` inside a `pages` context (Mintlify
# requires the referenced source to define the same navigation type as the slot
# it is mounted into). The array is: the "overview" page first, then every
# service page sorted alphabetically by tag.
#
# Run after `speakeasy run` so new API sections appear without hand-editing
# docs.json. Only `navigation.pages` is rewritten; $schema/theme/name/colors
# are preserved. Idempotent: no doc changes -> byte-identical output.
#
# Requires: bash, jq. No network, no toolchain.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DOCS_JSON="docs/docs.json"
OVERVIEW="overview"

if [[ ! -f "$DOCS_JSON" ]]; then
	echo "missing $DOCS_JSON" >&2
	exit 1
fi

# Collect service page paths (docs.json paths are doc-root-relative, no
# extension), sorted alphabetically by tag.
pages=()
# Lead with the overview landing page when present.
[[ -f "docs/${OVERVIEW}.mdx" ]] && pages+=("$OVERVIEW")
while IFS= read -r readme; do
	# docs/sdks/<tag>/README.mdx -> sdks/<tag>/README
	rel="${readme#docs/}"
	pages+=("${rel%.mdx}")
done < <(find docs/sdks -mindepth 2 -maxdepth 2 -name 'README.mdx' | sort)

if ((${#pages[@]} == 0)); then
	echo "no pages found (missing docs/${OVERVIEW}.mdx and docs/sdks/*/README.mdx)" >&2
	exit 1
fi

pages_json="$(printf '%s\n' "${pages[@]}" | jq -R . | jq -s .)"

tmp="$(mktemp)"
jq --indent 2 --argjson pages "$pages_json" '
	.navigation = {pages: $pages}
' "$DOCS_JSON" >"$tmp"

mv "$tmp" "$DOCS_JSON"
echo "updated $DOCS_JSON: ${#pages[@]} pages in navigation.pages"
