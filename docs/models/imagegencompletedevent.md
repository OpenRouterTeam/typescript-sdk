# ImageGenCompletedEvent

Emitted when generation completes and the final image is available

## Example Usage

```typescript
import { ImageGenCompletedEvent } from "@openrouter/sdk/models";

let value: ImageGenCompletedEvent = {
  b64Json: "iVBORw0KGgo...",
  created: 1700000000,
  type: "image_generation.completed",
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           | Example                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `b64Json`                                                                             | *string*                                                                              | :heavy_check_mark:                                                                    | Base64-encoded final image data                                                       |                                                                                       |
| `created`                                                                             | *number*                                                                              | :heavy_check_mark:                                                                    | Unix timestamp (seconds) when the image was generated                                 |                                                                                       |
| `type`                                                                                | *"image_generation.completed"*                                                        | :heavy_check_mark:                                                                    | The event type                                                                        |                                                                                       |
| `usage`                                                                               | [models.CompletionResponseUsage](../models/completionresponseusage.md)                | :heavy_minus_sign:                                                                    | Token and cost usage for a completion request, when available.                        | {<br/>"completion_tokens": 150,<br/>"cost": 0.001,<br/>"prompt_tokens": 25,<br/>"total_tokens": 175<br/>} |