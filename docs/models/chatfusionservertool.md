# ChatFusionServerTool

OpenRouter built-in server tool: queries multiple models, analyzes responses, and synthesizes the best answer

## Example Usage

```typescript
import { ChatFusionServerTool } from "@openrouter/sdk/models";

let value: ChatFusionServerTool = {
  type: "openrouter:fusion",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `type`                                                                               | [models.ChatFusionServerToolType](../models/chatfusionservertooltype.md)             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `parameters`                                                                         | [models.ChatFusionServerToolParameters](../models/chatfusionservertoolparameters.md) | :heavy_minus_sign:                                                                   | N/A                                                                                  |