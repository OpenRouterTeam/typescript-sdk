# OutputFusionServerToolItemReason

Category of why the analysis model failed, intended for programmatic retry/replace decisions. Free-form `error` text remains alongside this for human-readable diagnostics.

## Example Usage

```typescript
import { OutputFusionServerToolItemReason } from "@openrouter/sdk/models";

let value: OutputFusionServerToolItemReason = "content_filter";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"content_filter" | "length" | "empty_completion" | "stream_error" | "upstream_error" | "timeout" | "unknown" | Unrecognized<string>
```