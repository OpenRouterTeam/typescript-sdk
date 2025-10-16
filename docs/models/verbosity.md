# Verbosity

## Example Usage

```typescript
import { Verbosity } from "@openrouter/sdk/models";

let value: Verbosity = "high";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"high" | "low" | "medium" | Unrecognized<string>
```