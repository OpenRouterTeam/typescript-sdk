# OpenResponsesToolChoiceFunction

Force the model to call a specific function

## Example Usage

```typescript
import { OpenResponsesToolChoiceFunction } from "@openrouter/sdk/models";

let value: OpenResponsesToolChoiceFunction = {
  type: "function",
  name: "get_weather",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.OpenResponsesToolChoiceType](../models/openresponsestoolchoicetype.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `name`                                                                         | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |