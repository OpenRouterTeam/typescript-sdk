# Arena

Design Arena only: arena to query. Defaults to `models` when source is `design-arena`.

## Example Usage

```typescript
import { Arena } from "@openrouter/sdk/models/operations";

let value: Arena = "models";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"models" | "builders" | "agents" | Unrecognized<string>
```