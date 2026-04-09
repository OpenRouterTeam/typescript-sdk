# OpenAIResponseInputMessageItemContent


## Supported Types

### `models.InputAudio`

```typescript
const value: models.InputAudio = {
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
  type: "input_audio",
};
```

### `models.InputFile`

```typescript
const value: models.InputFile = {
  type: "input_file",
};
```

### `models.InputImage`

```typescript
const value: models.InputImage = {
  detail: "auto",
  type: "input_image",
};
```

### `models.InputText`

```typescript
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

