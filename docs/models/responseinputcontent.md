# ResponseInputContent

Input content for Responses API


## Supported Types

### `models.ResponseInputText`

```typescript
const value: models.ResponseInputText = {
  type: "input_text",
  text: "Hello, how are you?",
};
```

### `models.ResponseInputImage`

```typescript
const value: models.ResponseInputImage = {
  type: "input_image",
  detail: "auto",
  imageUrl: "https://shiny-pulse.com",
};
```

### `models.ResponseInputFile`

```typescript
const value: models.ResponseInputFile = {
  type: "input_file",
  fileId: "<id>",
  fileData: "<value>",
  filename: "example.file",
  fileUrl: "https://breakable-hippodrome.org",
};
```

