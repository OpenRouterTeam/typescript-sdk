# WebSearchStatus

## Example Usage

```typescript
import { WebSearchStatus } from "@openrouter/sdk/models";

let value: WebSearchStatus = "completed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"completed" | "searching" | "in_progress" | "failed" | Unrecognized<string>
```