# Quality

## Example Usage

```typescript
import { Quality } from "@openrouter/sdk/models";

let value: Quality = "auto";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"low" | "medium" | "high" | "auto" | Unrecognized<string>
```