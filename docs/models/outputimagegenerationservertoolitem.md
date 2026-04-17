# OutputImageGenerationServerToolItem

An openrouter:image_generation server tool output item

## Example Usage

```typescript
import { OutputImageGenerationServerToolItem } from "@openrouter/sdk/models";

let value: OutputImageGenerationServerToolItem = {
  status: "completed",
  type: "openrouter:image_generation",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `id`                                                                                                | *string*                                                                                            | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `imageB64`                                                                                          | *string*                                                                                            | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `imageUrl`                                                                                          | *string*                                                                                            | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `result`                                                                                            | *string*                                                                                            | :heavy_minus_sign:                                                                                  | The generated image as a base64-encoded string or URL, matching OpenAI image_generation_call format |                                                                                                     |
| `revisedPrompt`                                                                                     | *string*                                                                                            | :heavy_minus_sign:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `status`                                                                                            | [models.ToolCallStatus](../models/toolcallstatus.md)                                                | :heavy_check_mark:                                                                                  | N/A                                                                                                 | completed                                                                                           |
| `type`                                                                                              | *"openrouter:image_generation"*                                                                     | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |