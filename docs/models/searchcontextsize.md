# SearchContextSize

How much context to retrieve per search result. Defaults to `medium` (15000 chars).

## Example Usage

```typescript
import { SearchContextSize } from "@openrouter/sdk/models";

let value: SearchContextSize = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```