# ChatRequestReasoningEffort

Shorthand for setting reasoning effort. Equivalent to setting reasoning.effort. Cannot be used simultaneously with reasoning.effort if they differ.

## Example Usage

```typescript
import { ChatRequestReasoningEffort } from "@openrouter/sdk/models";

let value: ChatRequestReasoningEffort = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"xhigh" | "high" | "medium" | "low" | "minimal" | "none" | Unrecognized<string>
```