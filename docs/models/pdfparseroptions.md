# PDFParserOptions

Options for PDF parsing.

## Example Usage

```typescript
import { PDFParserOptions } from "@openrouter/sdk/models";

let value: PDFParserOptions = {};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `engine`                                                                                                           | *models.PDFParserEngine*                                                                                           | :heavy_minus_sign:                                                                                                 | The engine to use for parsing PDF files. "pdf-text" is deprecated and automatically redirected to "cloudflare-ai". |