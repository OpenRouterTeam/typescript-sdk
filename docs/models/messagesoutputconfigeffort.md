# MessagesOutputConfigEffort

How much effort the model should put into its response. Higher effort levels may result in more thorough analysis but take longer. Valid values are `low`, `medium`, `high`, `xhigh`, or `max`.

## Example Usage

```typescript
import { MessagesOutputConfigEffort } from "@openrouter/sdk/models";

let value: MessagesOutputConfigEffort = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"low" | "medium" | "high" | "xhigh" | "max" | Unrecognized<string>
```