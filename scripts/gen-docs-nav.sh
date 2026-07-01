#!/usr/bin/env bash
# Regenerate the "API Reference" navigation group in docs/docs.json from the
# service pages Speakeasy emits under docs/sdks/<tag>/README.mdx.
#
# Run this after `speakeasy run` so new API sections appear in the sidebar
# without hand-editing docs.json. Only the "API Reference" group's `pages`
# array is rewritten; every other part of docs.json is preserved untouched.
# Pages are listed alphabetically by tag. Idempotent: running with no doc
# changes leaves docs.json byte-identical.
#
# Requires: bash, jq. No network, no toolchain.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DOCS_JSON="docs/docs.json"
GROUP="API Reference"

if [[ ! -f "$DOCS_JSON" ]]; then
	echo "missing $DOCS_JSON" >&2
	exit 1
fi

# Collect service page paths (docs.json paths are repo-doc-root-relative and
# carry no extension), sorted alphabetically by tag.
pages=()
while IFS= read -r readme; do
	# docs/sdks/<tag>/README.mdx -> sdks/<tag>/README
	rel="${readme#docs/}"
	pages+=("${rel%.mdx}")
done < <(find docs/sdks -mindepth 2 -maxdepth 2 -name 'README.mdx' | sort)

if ((${#pages[@]} == 0)); then
	echo "no service pages found under docs/sdks/*/README.mdx" >&2
	exit 1
fi

# Build a JSON array of the page paths.
pages_json="$(printf '%s\n' "${pages[@]}" | jq -R . | jq -s .)"

# Rewrite only the matching group's pages. Fail loudly if the group is absent
# so a renamed/missing group never silently produces an empty sidebar.
tmp="$(mktemp)"
jq --indent 2 \
	--arg group "$GROUP" \
	--argjson pages "$pages_json" '
	(.navigation.groups
		| map(select(.group == $group))
		| length) as $matches
	| if $matches == 0 then
		error("group \"" + $group + "\" not found in navigation.groups")
	  else . end
	| .navigation.groups |= map(
		if .group == $group then .pages = $pages else . end
	  )
' "$DOCS_JSON" >"$tmp"

mv "$tmp" "$DOCS_JSON"
echo "updated $DOCS_JSON: ${#pages[@]} pages in \"$GROUP\""
