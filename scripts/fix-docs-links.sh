#!/usr/bin/env bash
# Strip the `.mdx` extension from cross-references in the docs Speakeasy emits
# under docs/.
#
# Mintlify serves every page at an extensionless path, so a generated link like
# `[operations.Foo](../../models/operations/foo.mdx)` 404s while
# `[operations.Foo](../../models/operations/foo)` resolves. Speakeasy emits the
# extension, so rewrite it after every `speakeasy run`.
#
# Idempotent: no offending links -> no file changes. Pass --check to report
# offending files and exit non-zero without editing (for CI).
#
# Requires: bash, grep, sed. No network, no toolchain.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DOCS_DIR="docs"
# Markdown link whose target ends in `.mdx`, with an optional `#anchor`.
LINK_PATTERN='\]\([^)]*\.mdx(#[^)]*)?\)'

if [[ ! -d "$DOCS_DIR" ]]; then
	echo "missing $DOCS_DIR/" >&2
	exit 1
fi

did_request_check=false
if [[ "${1:-}" == "--check" ]]; then
	did_request_check=true
elif [[ $# -gt 0 ]]; then
	echo "usage: $0 [--check]" >&2
	exit 2
fi

files=()
while IFS= read -r file; do
	files+=("$file")
done < <(grep -rlE "$LINK_PATTERN" "$DOCS_DIR" --include='*.mdx' | sort)

if ((${#files[@]} == 0)); then
	echo "no .mdx link extensions in $DOCS_DIR/"
	exit 0
fi

if [[ "$did_request_check" == true ]]; then
	echo "found .mdx link extensions in ${#files[@]} file(s) — run scripts/fix-docs-links.sh" >&2
	printf '%s\n' "${files[@]}" >&2
	exit 1
fi

sed -i -E 's/\]\(([^)]*)\.mdx(#[^)]*)?\)/](\1\2)/g' "${files[@]}"
echo "stripped .mdx link extensions in ${#files[@]} file(s)"
