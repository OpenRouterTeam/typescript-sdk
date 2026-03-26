# OpenResponsesInputMessageItemContentUnion


## Supported Types

### `models.ResponseInputText`

```typescript
const value: models.ResponseInputText = {
  type: "input_text",
  text: "Hello, how can I help you?",
};
```

### `models.OpenResponsesInputMessageItemContentInputImage`

```typescript
const value: models.OpenResponsesInputMessageItemContentInputImage = {
  type: "input_image",
  detail: "auto",
};
```

### `models.ResponseInputFile`

```typescript
const value: models.ResponseInputFile = {
  type: "input_file",
};
```

### `models.ResponseInputAudio`

```typescript
const value: models.ResponseInputAudio = {
  type: "input_audio",
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
};
```

### `models.ResponseInputVideo`

```typescript
const value: models.ResponseInputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```

