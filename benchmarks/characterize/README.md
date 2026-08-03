# SDK bundle and memory characterization

This harness measures four isolated SDK paths without network access:

- importing and constructing the root SDK;
- creating authenticated transport requests;
- validating a representative chat request;
- parsing 1,000 deterministically fragmented SSE events.

Run it from the repository root:

```sh
pnpm benchmark:characterize --runs=5
pnpm benchmark:characterize --runs=7 --json
```

Each case is bundled independently with esbuild. The harness explicitly enables bundling,
minification, and tree shaking and reports the resulting raw, gzip level 9, and Brotli quality 11
byte counts. Dependencies are included in each bundle.

Memory measurements run each bundle in multiple fresh `node --expose-gc` processes and report the
median. `import heap` and `import RSS` are retained deltas after forced garbage collection.
`scenario peak` is the largest sampled heap increase while the deterministic workload runs, and
`scenario retained` is the post-workload heap delta after forced garbage collection. The absolute
post-import heap and RSS values are also present in the JSON report.

Use the same machine, Node version, run count, and source revision for before/after comparisons.
Memory figures can vary across operating systems and Node/V8 releases; bundle byte counts are the
more stable cross-machine signal.
