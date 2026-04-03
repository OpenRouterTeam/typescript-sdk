# ChatContentItems

Content part for chat completion messages


## Supported Types

### `models.ChatContentText`

```typescript
const value: models.ChatContentText = {
  type: "text",
  text: "Hello, world!",
};
```

### `models.ChatContentImage`

```typescript
const value: models.ChatContentImage = {
  type: "image_url",
  imageUrl: {
    url: "https://vague-assist.org/",
  },
};
```

### `models.ChatContentAudio`

```typescript
const value: models.ChatContentAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

### `models.LegacyChatContentVideo`

```typescript
const value: models.LegacyChatContentVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://other-spirit.org/",
  },
};
```

### `models.ChatContentVideo`

```typescript
const value: models.ChatContentVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://other-spirit.org/",
  },
};
```

### `models.ChatContentFile`

```typescript
const value: models.ChatContentFile = {
  type: "file",
  file: {},
};
```

