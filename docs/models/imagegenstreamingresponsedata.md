# ImageGenStreamingResponseData


## Supported Types

### `models.ImageGenPartialImageEvent`

```typescript
const value: models.ImageGenPartialImageEvent = {
  b64Json: "iVBORw0KGgo...",
  partialImageIndex: 0,
  type: "image_generation.partial_image",
};
```

### `models.ImageGenCompletedEvent`

```typescript
const value: models.ImageGenCompletedEvent = {
  b64Json: "iVBORw0KGgo...",
  created: 1700000000,
  type: "image_generation.completed",
};
```

### `models.ImageGenStreamErrorEvent`

```typescript
const value: models.ImageGenStreamErrorEvent = {
  error: {
    message: "Your request was rejected as a result of our safety system.",
  },
  type: "error",
};
```

