# Speed

Controls output generation speed. When set to `fast`, uses a higher-speed inference configuration at premium pricing. Defaults to `standard` when omitted.

## Example Usage

```typescript
import { Speed } from "@openrouter/sdk/models";

let value: Speed = "fast";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"fast" | "standard" | Unrecognized<string>
```