# ChatNamedToolChoice

Named tool choice for specific function

## Example Usage

```typescript
import { ChatNamedToolChoice } from "@openrouter/sdk/models";

let value: ChatNamedToolChoice = {
  type: "function",
  function: {
    name: "get_weather",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.ChatNamedToolChoiceType](../models/chatnamedtoolchoicetype.md)         | :heavy_check_mark:                                                             | N/A                                                                            |
| `function`                                                                     | [models.ChatNamedToolChoiceFunction](../models/chatnamedtoolchoicefunction.md) | :heavy_check_mark:                                                             | N/A                                                                            |