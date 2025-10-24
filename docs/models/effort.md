# Effort

## Example Usage

```typescript
import { Effort } from "@openrouter/sdk/models";

let value: Effort = "low";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"minimal" | "low" | "medium" | "high" | Unrecognized<string>
```