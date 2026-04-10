# ChatNamedToolChoice

Named tool choice for specific function

## Example Usage

```typescript
import { ChatNamedToolChoice } from "@openrouter/sdk/models";

let value: ChatNamedToolChoice = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `function`                                                                     | [models.ChatNamedToolChoiceFunction](../models/chatnamedtoolchoicefunction.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `type`                                                                         | [models.ChatNamedToolChoiceType](../models/chatnamedtoolchoicetype.md)         | :heavy_check_mark:                                                             | N/A                                                                            |