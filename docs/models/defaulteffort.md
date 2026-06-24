# DefaultEffort

Default reasoning effort when the client enables reasoning without specifying effort. Maps to `reasoning.effort` in chat requests. When `"none"`, prefer omitting effort unless the user explicitly disables reasoning.

## Example Usage

```typescript
import { DefaultEffort } from "@openrouter/sdk/models";

let value: DefaultEffort = "medium";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"max" | "xhigh" | "high" | "medium" | "low" | "minimal" | "none" | Unrecognized<string>
```