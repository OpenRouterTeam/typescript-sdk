# NamedToolChoice

## Example Usage

```typescript
import { NamedToolChoice } from "@openrouter/sdk/models";

let value: NamedToolChoice = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `type`                                                                 | *"function"*                                                           | :heavy_check_mark:                                                     | N/A                                                                    |
| `function`                                                             | [models.NamedToolChoiceFunction](../models/namedtoolchoicefunction.md) | :heavy_check_mark:                                                     | N/A                                                                    |