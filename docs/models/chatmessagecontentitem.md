# ChatMessageContentItem


## Supported Types

### `models.ChatMessageContentItemText`

```typescript
const value: models.ChatMessageContentItemText = {
  type: "text",
  text: "<value>",
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
    format: "pcm24",
  },
};
```

