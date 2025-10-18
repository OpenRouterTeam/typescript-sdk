# OpenResponsesInputContent

Content item in a response input message


## Supported Types

### `models.OpenResponsesInputText`

```typescript
const value: models.OpenResponsesInputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

### `models.OpenResponsesInputImage`

```typescript
const value: models.OpenResponsesInputImage = {
  type: "input_image",
  detail: "high",
  imageUrl: "https://harmful-corporation.name",
};
```

### `models.OpenResponsesInputFile`

```typescript
const value: models.OpenResponsesInputFile = {
  type: "input_file",
  fileId: "<id>",
  fileData: "<value>",
  filename: "example.file",
  fileUrl: "https://subdued-labourer.info/",
};
```

