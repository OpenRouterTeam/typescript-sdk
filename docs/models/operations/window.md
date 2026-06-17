# Window

Time window for the data

## Example Usage

```typescript
import { Window } from "@openrouter/sdk/models/operations";

let value: Window = "1d";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"1hr" | "1d" | "1w" | "1mo" | Unrecognized<string>
```