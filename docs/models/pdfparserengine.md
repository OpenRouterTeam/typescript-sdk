# PDFParserEngine

The engine to use for parsing PDF files.

## Example Usage

```typescript
import { PDFParserEngine } from "@openrouter/sdk/models";

let value: PDFParserEngine = "native";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"mistral-ocr" | "pdf-text" | "native" | Unrecognized<string>
```