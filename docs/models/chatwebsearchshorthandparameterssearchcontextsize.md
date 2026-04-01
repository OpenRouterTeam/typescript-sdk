# ChatWebSearchShorthandParametersSearchContextSize

How much context to retrieve per result. Defaults to medium (15000 chars). Only applies when using the Exa engine; ignored with native provider search.

## Example Usage

```typescript
import { ChatWebSearchShorthandParametersSearchContextSize } from "@openrouter/sdk/models";

let value: ChatWebSearchShorthandParametersSearchContextSize = "high";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```