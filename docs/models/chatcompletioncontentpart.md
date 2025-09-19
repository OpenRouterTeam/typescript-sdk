# ChatCompletionContentPart


## Supported Types

### `models.ChatCompletionContentPartText`

```typescript
const value: models.ChatCompletionContentPartText = {
  type: "text",
  text: "<value>",
};
```

### `models.ChatCompletionContentPartImage`

```typescript
const value: models.ChatCompletionContentPartImage = {
  type: "image_url",
  imageUrl: {
    url: "https://thin-freezing.info/",
  },
};
```

### `models.ChatCompletionContentPartAudio`

```typescript
const value: models.ChatCompletionContentPartAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "pcm24",
  },
};
```

