# ChatContentItems

Content part for chat completion messages


## Supported Types

### `models.ChatContentFile`

```typescript
const value: models.ChatContentFile = {
  file: {},
  type: "file",
};
```

### `models.ChatContentImage`

```typescript
const value: models.ChatContentImage = {
  imageUrl: {
    url: "https://vague-assist.org/",
  },
  type: "image_url",
};
```

### `models.ChatContentAudio`

```typescript
const value: models.ChatContentAudio = {
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
  type: "input_audio",
};
```

### `models.LegacyChatContentVideo`

```typescript
const value: models.LegacyChatContentVideo = {
  type: "input_video",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

### `models.ChatContentText`

```typescript
const value: models.ChatContentText = {
  text: "Hello, world!",
  type: "text",
};
```

### `models.ChatContentVideo`

```typescript
const value: models.ChatContentVideo = {
  type: "video_url",
  videoUrl: {
    url: "https://example.com/video.mp4",
  },
};
```

