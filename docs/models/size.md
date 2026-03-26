# Size

## Example Usage

```typescript
import { Size } from "@openrouter/sdk/models";

let value: Size = "1024x1024";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"1024x1024" | "1024x1536" | "1536x1024" | "auto" | Unrecognized<string>
```