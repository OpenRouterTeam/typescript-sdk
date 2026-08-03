# ECO-2747 SDK characterization

Measured on macOS arm64 with Node 24.18.0, esbuild 0.25.11, and five fresh processes per
case. For a controlled comparison, the baseline restored the three optimized generated
files from `cea17fa4` while holding the harness and package metadata constant. Both
measurements used:

```sh
node benchmarks/characterize/index.mjs --runs=5 --json
```

Every bundle used ESM output, bundled dependencies, minification, and explicit
`treeShaking: true`, targeting Node 22.

## Before and after

- Root import bundle: raw 661,969 → 661,787 bytes; gzip 125,630 → 125,589; Brotli
  97,006 → 96,995. Median retained import heap delta was 118,906,904 → 118,955,320
  bytes and RSS delta was 229,212,160 → 230,113,280 bytes.
- Transport bundle: raw 118,279 → 118,098 bytes; gzip 32,898 → 32,878; Brotli
  28,565 → 28,524. Median retained import heap delta was 973,592 → 965,016 bytes and
  RSS delta was 4,505,600 → 4,292,608 bytes.
- Validation bundle: raw 135,048 → 135,048 bytes; gzip 36,803 → 36,803; Brotli
  32,110 → 32,110. Median retained import heap delta was 13,414,304 → 13,410,560
  bytes and RSS delta was 30,736,384 → 29,835,264 bytes.
- SSE fragmentation bundle: raw 2,750 → 2,750 bytes; gzip 1,386 → 1,386; Brotli
  1,251 → 1,251. Median retained import heap delta was 373,760 → 373,760 bytes and
  RSS delta was 2,244,608 → 2,310,144 bytes.

The deterministic outputs were identical before and after: root methods remained
functions; transport produced the same URL, headers, authorization, cookie, and body;
validation produced the same outbound JSON shape; and SSE parsing produced 1,000 events
and 23,890 characters. Small memory differences outside transport are measurement noise.

## Generator constraint

The pinned Speakeasy CLI 1.787.0 accepts `useIndexModules: false`, but this specification
cannot currently regenerate with it. The generated direct imports collide with local
operation wrapper names, for example `ListScimGroupsResponse`, and the generator's compile
step fails with `TS2440`, `TS2395`, `TS2448`, and `TS2454`. Keeping that output would
require generated-code alias patches or public model renames, neither of which is a safe
or generator-owned SDK optimization.

The retained optimization splits codec-only base64 helpers from the Zod adapters and
redirects transport imports to the codec module. Speakeasy persistent edits preserved
all three generated-file import changes during a successful pinned regeneration.

## Twenty-run Responses attribution

The expanded matrix ran each minified, tree-shaken bundle in 20 fresh processes.
Median retained import heap deltas were:

- `OpenRouterCore`: 965,552 bytes.
- `responsesSend`: 41,988,580 bytes.
- `ResponsesRequest$outboundSchema`: 21,757,296 bytes.
- `StreamEvents$inboundSchema`: 21,580,420 bytes.
- `TextDeltaEvent$inboundSchema`: 1,087,232 bytes.
- `StreamEventsResponseCompleted$inboundSchema`: 18,010,468 bytes.

This isolates the impactful remaining target: the transport and SSE framing runtime
are small, while the generated Responses sender eagerly constructs both broad request
and stream-event schema graphs. A text-delta-specific schema uses about 95% less retained
import heap than the all-event union, but the completion schema still loads the full
response/output graph.

Lazy event dispatch alone would improve startup but not invocation peak because the
completion event eventually loads its 18 MB graph. A material peak reduction requires
generator-owned operation-private validators that dispatch request tools, stream events,
and completed output items by discriminator without constructing every unused branch.
That remains a generator architecture change; it must pass the exact schema/error
equivalence suite before replacing the public generated schemas.
