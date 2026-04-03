# BaseResponseInputMessageItemContent


## Supported Types

### `models.InputText`

```typescript
const value: models.InputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

### `models.InputImage`

```typescript
const value: models.InputImage = {
  type: "input_image",
  detail: "auto",
};
```

### `models.InputFile`

```typescript
const value: models.InputFile = {
  type: "input_file",
};
```

### `models.InputAudio`

```typescript
const value: models.InputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

