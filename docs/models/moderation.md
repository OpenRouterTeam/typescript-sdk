# Moderation

## Example Usage

```typescript
import { Moderation } from "@openrouter/sdk/models";

let value: Moderation = "low";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"auto" | "low" | Unrecognized<string>
```