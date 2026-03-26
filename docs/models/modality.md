# Modality

## Example Usage

```typescript
import { Modality } from "@openrouter/sdk/models";

let value: Modality = "audio";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"text" | "image" | "audio" | Unrecognized<string>
```