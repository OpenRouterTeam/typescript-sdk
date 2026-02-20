# ChatMessageContentItem

Content part for chat completion messages


## Supported Types

### `models.ChatMessageContentItemText`

```typescript
const value: models.ChatMessageContentItemText = {
  type: "text",
  text: "Hello, world!",
};
```

### `models.ChatMessageContentItemImage`

```typescript
const value: models.ChatMessageContentItemImage = {
  type: "image_url",
  imageUrl: {
    url: "https://better-nephew.com/",
  },
};
```

### `models.ChatMessageContentItemAudio`

```typescript
const value: models.ChatMessageContentItemAudio = {
  type: "input_audio",
  inputAudio: {
    data: "<value>",
    format: "<value>",
  },
};
```

### `models.ChatMessageContentItem1`

```typescript
const value: models.ChatMessageContentItem1 = {
  type: "video_url",
  videoUrl: {
    url: "https://standard-step.net/",
  },
};
```

