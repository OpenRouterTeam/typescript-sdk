# ChatWebSearchShorthandSearchContextSize

How much context to retrieve per result. Defaults to medium (15000 chars). Only applies when using the Exa engine; ignored with native provider search.

## Example Usage

```typescript
import { ChatWebSearchShorthandSearchContextSize } from "@openrouter/sdk/models";

let value: ChatWebSearchShorthandSearchContextSize = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```