# OpenAIResponsesFunctionToolChoice

Force a specific function tool by name

## Example Usage

```typescript
import { OpenAIResponsesFunctionToolChoice } from "@openrouter/sdk/models";

let value: OpenAIResponsesFunctionToolChoice = {
  name: "get_weather",
  type: "function",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `name`                                                                                             | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `type`                                                                                             | [models.OpenAIResponsesFunctionToolChoiceType](../models/openairesponsesfunctiontoolchoicetype.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |