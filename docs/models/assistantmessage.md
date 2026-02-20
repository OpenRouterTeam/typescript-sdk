# AssistantMessage

Assistant message for requests and responses

## Example Usage

```typescript
import { AssistantMessage } from "@openrouter/sdk/models";

let value: AssistantMessage = {
  role: "assistant",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `role`                                                                 | [models.AssistantMessageRole](../models/assistantmessagerole.md)       | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `content`                                                              | *models.AssistantMessageContent*                                       | :heavy_minus_sign:                                                     | Assistant message content                                              |                                                                        |
| `name`                                                                 | *string*                                                               | :heavy_minus_sign:                                                     | Optional name for the assistant                                        |                                                                        |
| `toolCalls`                                                            | [models.ChatMessageToolCall](../models/chatmessagetoolcall.md)[]       | :heavy_minus_sign:                                                     | Tool calls made by the assistant                                       |                                                                        |
| `refusal`                                                              | *string*                                                               | :heavy_minus_sign:                                                     | Refusal message if content was refused                                 |                                                                        |
| `reasoning`                                                            | *string*                                                               | :heavy_minus_sign:                                                     | Reasoning output                                                       |                                                                        |
| `reasoningDetails`                                                     | *models.ReasoningDetailUnion*[]                                        | :heavy_minus_sign:                                                     | Reasoning details for extended thinking models                         |                                                                        |
| `images`                                                               | [models.AssistantMessageImages](../models/assistantmessageimages.md)[] | :heavy_minus_sign:                                                     | Generated images from image generation models                          | [<br/>{<br/>"image_url": {<br/>"url": "data:image/png;base64,iVBORw0KGgo..."<br/>}<br/>}<br/>] |