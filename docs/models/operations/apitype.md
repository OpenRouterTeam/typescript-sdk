# ApiType

Type of API used for the generation

## Example Usage

```typescript
import { ApiType } from "@openrouter/sdk/models/operations";

let value: ApiType = "embeddings";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"completions" | "embeddings" | Unrecognized<string>
```