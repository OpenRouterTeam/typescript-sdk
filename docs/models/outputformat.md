# OutputFormat

## Example Usage

```typescript
import { OutputFormat } from "@openrouter/sdk/models";

let value: OutputFormat = "png";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"png" | "webp" | "jpeg" | Unrecognized<string>
```