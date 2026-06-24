# TaskType

Filter results by task type. For Artificial Analysis, maps to the corresponding index. For Design Arena, maps to the matching category.

## Example Usage

```typescript
import { TaskType } from "@openrouter/sdk/models/operations";

let value: TaskType = "coding";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"coding" | "intelligence" | "agentic" | Unrecognized<string>
```