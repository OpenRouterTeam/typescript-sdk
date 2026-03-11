# ModelEnum

## Example Usage

```typescript
import { ModelEnum } from "@openrouter/sdk/models";

let value: ModelEnum = "gpt-image-1-mini";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"gpt-image-1" | "gpt-image-1-mini" | Unrecognized<string>
```