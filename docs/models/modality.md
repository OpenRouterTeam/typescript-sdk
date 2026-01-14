# Modality

## Example Usage

```typescript
import { Modality } from "@openrouter/sdk/models";

let value: Modality = "image";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"text" | "image" | Unrecognized<string>
```