# ImageStreamingResponseData


## Supported Types

### `models.ImageGenPartialImageEvent`

```typescript
const value: models.ImageGenPartialImageEvent = {
  b64Json: "<base64-encoded-partial-image>",
  partialImageIndex: 0,
  type: "image_generation.partial_image",
};
```

### `models.ImageGenCompletedEvent`

```typescript
const value: models.ImageGenCompletedEvent = {
  b64Json: "<base64-encoded-final-image>",
  created: 1748372400,
  type: "image_generation.completed",
};
```

### `models.ImageGenStreamErrorEvent`

```typescript
const value: models.ImageGenStreamErrorEvent = {
  error: {
    message: "The upstream provider returned an error",
  },
  type: "error",
};
```

