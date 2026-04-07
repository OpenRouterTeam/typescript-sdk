# Constraint

The optimization axis for routing (fast, smart, latest, high, precise, cheap)

## Example Usage

```typescript
import { Constraint } from "@openrouter/sdk/models";

let value: Constraint = "fast";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"fast" | "smart" | "latest" | "high" | "precise" | "cheap" | Unrecognized<string>
```