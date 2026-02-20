# NamedToolChoice

Named tool choice for specific function

## Example Usage

```typescript
import { NamedToolChoice } from "@openrouter/sdk/models";

let value: NamedToolChoice = {
  type: "function",
  function: {
    name: "get_weather",
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | [models.NamedToolChoiceType](../models/namedtoolchoicetype.md)         | :heavy_check_mark:                                                     | N/A                                                                    |
| `function`                                                             | [models.NamedToolChoiceFunction](../models/namedtoolchoicefunction.md) | :heavy_check_mark:                                                     | N/A                                                                    |