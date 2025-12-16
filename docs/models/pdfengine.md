# PdfEngine

## Example Usage

```typescript
import { PdfEngine } from "@openrouter/sdk/models";

let value: PdfEngine = "pdf-text";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"mistral-ocr" | "pdf-text" | "native" | Unrecognized<string>
```