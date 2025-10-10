# OutputModality

## Example Usage

```typescript
import { OutputModality } from "@openrouter/sdk/models/operations";

let value: OutputModality = "image";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"text" | "image" | "embeddings" | Unrecognized<string>
```