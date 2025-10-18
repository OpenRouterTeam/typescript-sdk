# OpenResponsesNonStreamingResponseContent1


## Supported Types

### `models.ResponseInputText`

```typescript
const value: models.ResponseInputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

### `models.ResponseInputImage`

```typescript
const value: models.ResponseInputImage = {
  type: "input_image",
  detail: "auto",
  imageUrl: "https://example.com/image.jpg",
};
```

### `models.ResponseInputFile`

```typescript
const value: models.ResponseInputFile = {
  type: "input_file",
  fileId: "file-abc123",
  fileData: "<value>",
  filename: "document.pdf",
  fileUrl: "https://prime-bob.info",
};
```

