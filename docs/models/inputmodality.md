# InputModality

## Example Usage

```typescript
import { InputModality } from "@openrouter/sdk/models";

let value: InputModality = "text";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"text" | "image" | "file" | "audio" | "video" | Unrecognized<string>
```