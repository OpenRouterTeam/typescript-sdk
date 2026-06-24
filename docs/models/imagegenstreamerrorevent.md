# ImageGenStreamErrorEvent

Emitted when streaming generation fails after the SSE response starts

## Example Usage

```typescript
import { ImageGenStreamErrorEvent } from "@openrouter/sdk/models";

let value: ImageGenStreamErrorEvent = {
  error: {
    message: "The upstream provider returned an error",
  },
  type: "error",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `error`                                                                            | [models.ImageGenStreamErrorEventError](../models/imagegenstreamerroreventerror.md) | :heavy_check_mark:                                                                 | Provider error details                                                             |
| `type`                                                                             | *"error"*                                                                          | :heavy_check_mark:                                                                 | The event type                                                                     |