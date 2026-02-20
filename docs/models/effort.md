# Effort

Constrains effort on reasoning for reasoning models

## Example Usage

```typescript
import { Effort } from "@openrouter/sdk/models";

let value: Effort = "medium";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"xhigh" | "high" | "medium" | "low" | "minimal" | "none" | Unrecognized<string>
```