# Reason

## Example Usage

```typescript
import { Reason } from "@openrouter/sdk/models";

let value: Reason = "content_filter";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"max_output_tokens" | "content_filter" | Unrecognized<string>
```