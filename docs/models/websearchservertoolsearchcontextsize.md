# WebSearchServerToolSearchContextSize

How much context to retrieve per result. Defaults to medium (15000 chars).

## Example Usage

```typescript
import { WebSearchServerToolSearchContextSize } from "@openrouter/sdk/models";

let value: WebSearchServerToolSearchContextSize = "medium";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"low" | "medium" | "high" | Unrecognized<string>
```