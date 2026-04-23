# AnthropicDocumentBlockParamSourceUnion


## Supported Types

### `models.AnthropicBase64PdfSource`

```typescript
const value: models.AnthropicBase64PdfSource = {
  data: "JVBERi0x...",
  mediaType: "application/pdf",
  type: "base64",
};
```

### `models.AnthropicPlainTextSource`

```typescript
const value: models.AnthropicPlainTextSource = {
  data: "Hello, world!",
  mediaType: "text/plain",
  type: "text",
};
```

### `models.SourceContent`

```typescript
const value: models.SourceContent = {
  content: "<value>",
  type: "content",
};
```

### `models.AnthropicUrlPdfSource`

```typescript
const value: models.AnthropicUrlPdfSource = {
  type: "url",
  url: "https://example.com/document.pdf",
};
```

