# InputMessageItemContentUnion


## Supported Types

### `models.InputText`

```typescript
const value: models.InputText = {
  text: "Hello, how can I help you?",
  type: "input_text",
};
```

### `models.InputMessageItemContentInputImage`

```typescript
const value: models.InputMessageItemContentInputImage = {
  detail: "auto",
  type: "input_image",
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
  inputAudio: {
    data: "SGVsbG8gV29ybGQ=",
    format: "mp3",
  },
  type: "input_audio",
};
```

### `models.InputVideo`

```typescript
const value: models.InputVideo = {
  type: "input_video",
  videoUrl: "https://example.com/video.mp4",
};
```

